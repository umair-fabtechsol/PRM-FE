// jobs/reconciliation.js
const { stripe } = require("../config/stripe");
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const {
  notifyAdmin,
  notifyPartner,
} = require("../services/notificationService");
const ConversionService = require("../services/conversionService");
const Conversion = require("../models/Conversion");

// 1. Reconcile pending payments
async function reconcilePendingPayments() {
  try {
    console.log("Starting payment reconciliation...");

    // Find conversions with payment issues
    const pendingConversions = await Conversion.find({
      $or: [
        { paymentStatus: "pending" },
        {
          paymentStatus: "paid",
          "paymentDetails.transferStatus": { $ne: "completed" },
        },
        {
          paymentStatus: "failed",
          failureReason: { $regex: /retry/i },
        },
      ],

      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
    }).populate("campaign partner");

    let processedCount = 0;
    let successCount = 0;

    for (const conversion of pendingConversions) {
      processedCount++;

      try {
        // Re-process failed payments
        if (conversion.paymentStatus === "failed") {
          const processResult = await ConversionService.processConversion(
            conversion._id,
            ["partner"]
          );
          if (!processResult?.success) {
            await notifyAdmin(
              conversion.campaign.admin,
              processResult?.message ||
                `Failed to process conversion ${conversion._id} `
            );
            continue;
          }

          const result = await ConversionService.sendPaymentToVendor(
            conversion?.campaign,
            conversion?.partner,
            conversion
          );

          if (result?.success) successCount++;
          continue;
        }

        // Verify paid but not transferred conversions
        if (
          conversion.paymentStatus === "paid" &&
          conversion.paymentDetails.transferStatus !== "completed"
        ) {
          const transfer = await stripe.transfers.retrieve(
            conversion.paymentDetails.transferId
          );

          if (transfer.status === "paid") {
            await Conversion.updateOne(
              { _id: conversion._id },
              { "paymentDetails.transferStatus": "completed" }
            );
            successCount++;
          } else if (transfer.status === "failed") {
            // Retry the transfer
            const retryResult =
              await ConversionService.transferToPartnerWithVerification(
                conversion.partner,
                conversion.paymentDetails.amountPaid,
                conversion._id,
                conversion.campaign._id,
                conversion.paymentDetails.chargeId
              );

            if (retryResult.success) {
              await Conversion.updateOne(
                { _id: conversion._id },
                {
                  "paymentDetails.transferId": retryResult.transferId,
                  "paymentDetails.transferStatus": "pending",
                }
              );
              successCount++;
            }
          }
        }
      } catch (err) {
        console.error(`Error reconciling conversion ${conversion._id}:`, err);
        await Conversion.updateOne(
          { _id: conversion._id },
          {
            reconciliationAttempts:
              (conversion.reconciliationAttempts || 0) + 1,
            lastReconciliationError: err.message,
          }
        );
      }
    }

    console.log(
      `Payment reconciliation completed. Processed: ${processedCount}, Success: ${successCount}`
    );
    return { processedCount, successCount };
  } catch (err) {
    console.error("Error in reconcilePendingPayments:", err);
    throw err;
  }
}

// 2. Flag suspicious activity
async function flagSuspiciousActivity() {
  try {
    console.log("Starting suspicious activity check...");

    // Check for abnormal conversion patterns
    const suspiciousCampaigns = await Campaign.aggregate([
      {
        $lookup: {
          from: "conversions",
          localField: "_id",
          foreignField: "campaign",
          as: "conversions",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          admin: 1,
          conversionCount: { $size: "$conversions" },
          paidCount: {
            $size: {
              $filter: {
                input: "$conversions",
                as: "conv",
                cond: { $eq: ["$$conv.paymentStatus", "paid"] },
              },
            },
          },
          failedCount: {
            $size: {
              $filter: {
                input: "$conversions",
                as: "conv",
                cond: { $eq: ["$$conv.paymentStatus", "failed"] },
              },
            },
          },
          disputeCount: 1,
          createdAt: 1,
        },
      },
      {
        $match: {
          $or: [
            { failedCount: { $gt: 10 } },
            {
              $expr: {
                $gt: [
                  { $divide: ["$failedCount", "$conversionCount"] },
                  0.3, // 30% failure rate
                ],
              },
            },
            { disputeCount: { $gt: 3 } },
          ],
        },
      },
    ]);

    // Flag suspicious campaigns
    for (const campaign of suspiciousCampaigns) {
      await Campaign.updateOne(
        { _id: campaign._id },
        {
          status: "under_review",
          reviewReason: "Suspicious activity detected",
          lastReviewed: new Date(),
        }
      );

      await notifyAdmin(
        campaign.admin,
        `Campaign "${campaign.name}" flagged for review due to suspicious activity`
      );
    }

    // Check for partner payment anomalies
    const suspiciousPartners = await User.aggregate([
      {
        $match: { role: "partner" },
      },
      {
        $lookup: {
          from: "conversions",
          localField: "_id",
          foreignField: "partner",
          as: "conversions",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          conversionCount: { $size: "$conversions" },
          paidCount: {
            $size: {
              $filter: {
                input: "$conversions",
                as: "conv",
                cond: { $eq: ["$$conv.paymentStatus", "paid"] },
              },
            },
          },
          lastConversion: { $max: "$conversions.createdAt" },
        },
      },
      {
        $match: {
          $or: [
            { conversionCount: { $gt: 1000 } }, // Unusually high volume
            {
              $expr: {
                $gt: [
                  { $divide: ["$paidCount", "$conversionCount"] },
                  0.95, // 95%+ success rate (potentially fake)
                ],
              },
            },
            {
              lastConversion: {
                $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
      },
    ]);

    // Flag suspicious partners
    for (const partner of suspiciousPartners) {
      await User.updateOne(
        { _id: partner._id },
        {
          accountStatus: "under_review",
          reviewReason: "Suspicious activity detected",
          lastReviewed: new Date(),
        }
      );

      await notifyAdmin(
        "superadmin", // Notify superadmin directly
        `Partner "${partner.name}" (${partner.email}) flagged for review`
      );
    }

    console.log(
      `Suspicious activity check completed. Flagged ${suspiciousCampaigns.length} campaigns and ${suspiciousPartners.length} partners.`
    );
    return {
      flaggedCampaigns: suspiciousCampaigns.length,
      flaggedPartners: suspiciousPartners.length,
    };
  } catch (err) {
    console.error("Error in flagSuspiciousActivity:", err);
    throw err;
  }
}

// 3. Process retry failures
async function processRetryFailures() {
  try {
    console.log("Processing retry failures...");

    // Find conversions with multiple failures
    const failedConversions = await Conversion.find({
      paymentStatus: "failed",
      reconciliationAttempts: { $gte: 3 }, // Already retried 3+ times
      finalAttempt: { $exists: false },
    }).populate("campaign partner");

    let processedCount = 0;
    let resolvedCount = 0;

    for (const conversion of failedConversions) {
      processedCount++;

      try {
        // Check if admin has updated payment method
        const admin = await User.findById(conversion.campaign.admin);
        const paymentMethods = await stripe.paymentMethods.list({
          customer: admin.stripeCustomerId,
          type: "card",
        });

        if (paymentMethods.data.length > 0) {
          // Try one final time with new payment method
          const result = await ConversionService.processConversion(
            conversion._id
          );

          if (result) {
            resolvedCount++;
            continue;
          }
        }

        // If still failing, mark as final attempt
        await Conversion.updateOne(
          { _id: conversion._id },
          {
            finalAttempt: true,
            paymentStatus: "canceled",
            failureReason: "Permanently failed after multiple attempts",
          }
        );

        // Notify admin and partner
        await notifyAdmin(
          conversion.campaign.admin,
          `Conversion permanently failed after multiple attempts. Campaign: ${conversion.campaign.name}`
        );

        await notifyPartner(
          conversion.partner._id,
          `A conversion was canceled due to payment failures. Amount: $${conversion.amount}`
        );
      } catch (err) {
        console.error(
          `Error processing retry failure for conversion ${conversion._id}:`,
          err
        );
      }
    }

    console.log(
      `Retry failures processed. Total: ${processedCount}, Resolved: ${resolvedCount}`
    );
    return { processedCount, resolvedCount };
  } catch (err) {
    console.error("Error in processRetryFailures:", err);
    throw err;
  }
}

module.exports = {
  reconcilePendingPayments,
  flagSuspiciousActivity,
  processRetryFailures,
};
