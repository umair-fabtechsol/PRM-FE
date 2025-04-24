// services/paymentService.js
const { stripe } = require("../config/stripe");
const Campaign = require("../models/Campaign");
const { default: Conversion } = require("../models/Conversion");
const User = require("../models/userModel");
const { notifyAdmin, notifyPartner } = require("./notificationService");

class ConversionService {
  static async processConversion(conversionId, accounts = []) {
    try {
      const conversion = await Conversion.findById(conversionId)
        .populate("campaign")
        .populate("partner")
        .populate({
          path: "campaign",
          populate: { path: "admin" },
        });

      const { campaign, partner } = conversion;
      const admin = campaign.admin;

      // Edge Case 1: Verify all accounts are properly set up
      if (!(await this.verifyAccounts(admin, partner, conversion, accounts))) {
        return;
      }

      // Edge Case 2: Check campaign budget limits
      // TODO: not confirmed yet
      // if (await this.exceedsCampaignBudget(campaign, conversion.amount)) {
      //   await this.handleBudgetExceeded(campaign, conversion);
      //   return;
      // }

      return {
        success: true,
        message: `account processed successfully`,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error processing account: " + error.message ,
      };
    }
  }

  // ========== Core Methods ==========
  static async chargeAdmin(admin, campaign, conversion) {
    // 1. Charge the admin with retry logic
    const chargeResult = await this.chargeAdminWithRetries(
      admin,
      conversion.amount,
      conversion._id,
      campaign._id
    );

    if (!chargeResult.success) {
      await this.handleFailedPayment(conversion, chargeResult.error);
      return;
    }
  }

  static async sendPaymentToVendor(campaign, partner, conversion) {
    try {
      // 1. Calculate amounts with platform fee
      const { partnerAmount, platformFee } = this.calculatePayout(
        conversion.amount,
        campaign.partnerShare
      );

      // 2. Transfer to partner with verification
      const transferResult = await this.transferToPartnerWithVerification(
        partner,
        partnerAmount,
        conversion._id,
        campaign._id,
        conversion.paymentDetails.chargeId // Using the existing charge ID
      );

      if (!transferResult.success) {
        // Handle transfer failure
        const errorMessage =
          transferResult.error?.message || "Transfer to partner failed";

        // Update conversion record
        await Conversion.updateOne(
          { _id: conversion._id },
          {
            paymentStatus: "failed",
            failureReason: errorMessage,
            "paymentDetails.transferStatus": "failed",
            "paymentDetails.lastError": errorMessage,
            "paymentDetails.lastAttempt": new Date(),
          }
        );

        // Notify admin and superadmin
        await this.notifyPaymentFailure({
          campaign,
          partner,
          conversion,
          errorType: "transfer_failed",
          errorMessage,
          recipientRoles: ["admin", "superadmin"],
        });

        return {
          success: false,
          error: errorMessage,
          partnerAmount,
          platformFee,
        };
      }

      // 3. Update records if transfer succeeded
      await this.finalizeConversion(
        conversion,
        { paymentIntentId: conversion.paymentDetails.chargeId }, // Reusing existing charge info
        transferResult,
        platformFee
      );

      return {
        success: true,
        partnerAmount,
        platformFee,
        transferId: transferResult.transferId,
      };
    } catch (error) {
      console.error(
        `Error in sendPaymentToVendor for conversion ${conversion._id}:`,
        error
      );

      // Update conversion with error details
      await Conversion.updateOne(
        { _id: conversion._id },
        {
          paymentStatus: "failed",
          failureReason: error.message,
          "paymentDetails.lastError": error.message,
          "paymentDetails.lastAttempt": new Date(),
        }
      );

      // Notify admin and superadmin
      await this.notifyPaymentFailure({
        campaign,
        partner,
        conversion,
        errorType: "processing_error",
        errorMessage: error.message,
        recipientRoles: ["admin", "superadmin"],
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Helper method for notification
  static async notifyPaymentFailure({
    campaign,
    partner,
    conversion,
    errorType,
    errorMessage,
    recipientRoles,
  }) {
    try {
      // Get recipients based on roles
      const recipients = await User.find({
        role: { $in: recipientRoles },
      }).select("_id email");

      // Send notifications
      await Promise.all(
        recipients.map(async (recipient) => {
          await NotificationService.sendPaymentFailureNotification({
            recipient,
            campaign,
            partner,
            conversion,
            errorType,
            errorMessage,
          });
        })
      );
    } catch (notificationError) {
      console.error("Error sending failure notifications:", notificationError);
      // Fail silently for notification errors
    }
  }

  // Updated finalizeConversion method
  static async finalizeConversion(
    conversion,
    chargeResult,
    transferResult,
    platformFee
  ) {
    const updates = {
      paymentStatus: "paid",
      "paymentDetails.transferId": transferResult.transferId,
      "paymentDetails.transferStatus": "completed",
      "paymentDetails.amountPaid": transferResult.amount,
      "paymentDetails.platformFee": platformFee,
      processedAt: new Date(),
    };

    if (chargeResult && chargeResult.paymentIntentId) {
      updates["paymentDetails.chargeId"] = chargeResult.paymentIntentId;
    }

    await Conversion.updateOne({ _id: conversion._id }, updates);

    // Update campaign totals
    await Campaign.updateOne(
      { _id: conversion.campaign },
      {
        $inc: {
          totalConversions: 1,
          totalValue: conversion.amount,
        },
      }
    );
  }

  static async verifyAccounts(
    admin,
    partner,
    conversion,
    accounts = ["admin", "partner"]
  ) {
    // Verify admin payment method
    if (
      (accounts.includes("admin") && !admin.stripePaymentMethodId) ||
      !admin.stripeCustomerId
    ) {
      await Conversion.updateOne(
        { _id: conversion._id },
        {
          paymentStatus: "failed",
          failureReason: "Admin payment method not set up",
        }
      );
      await notifyAdmin(admin._id, "Payment method required for conversions");
      return false;
    }

    // Verify partner account
    if (accounts.includes("partner") && !partner.stripeAccountId) {
      await Conversion.updateOne(
        { _id: conversion._id },
        { paymentStatus: "failed", failureReason: "Partner account not set up" }
      );
      await notifyAdmin(admin._id, "Partner not ready to receive payments");
      return false;
    }

    return true;
  }

  static async chargeAdminWithRetries(
    admin,
    amount,
    conversionId,
    campaignId,
    attempt = 0
  ) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        customer: admin.stripeCustomerId,
        payment_method: admin.stripePaymentMethodId,
        off_session: true,
        confirm: true,
        metadata: {
          conversionId: conversionId.toString(),
          campaignId: campaignId.toString(),
          attempt: attempt + 1,
        },
        transfer_group: `campaign_${campaignId}`,
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        amount: amount,
      };
    } catch (err) {
      // Edge Case 3: Handle specific decline codes
      if (err.code === "authentication_required" && attempt < 2) {
        await notifyAdmin(admin._id, "Payment authorization required");
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (attempt + 1))
        );
        return this.chargeAdminWithRetries(
          admin,
          amount,
          conversionId,
          campaignId,
          attempt + 1
        );
      }

      // Edge Case 4: Insufficient funds
      if (
        err.code === "card_declined" &&
        err.decline_code === "insufficient_funds"
      ) {
        return {
          success: false,
          error: {
            type: "insufficient_funds",
            message: "Insufficient funds in admin account",
          },
        };
      }

      return {
        success: false,
        error: {
          type: "payment_failed",
          message: err.message,
        },
      };
    }
  }

  static async transferToPartnerWithVerification(
    partner,
    amount,
    conversionId,
    campaignId,
    chargeId
  ) {
    try {
      // Edge Case 5: Verify partner account status
      const account = await stripe.accounts.retrieve(partner.stripeAccountId);
      if (account.requirements.disabled_reason) {
        throw new Error(
          `Partner account restricted: ${account.requirements.disabled_reason}`
        );
      }

      const transfer = await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        destination: partner.stripeAccountId,
        metadata: {
          conversionId: conversionId.toString(),
          campaignId: campaignId.toString(),
          sourceCharge: chargeId,
        },
        source_type: "card",
      });

      return {
        success: true,
        transferId: transfer.id,
      };
    } catch (err) {
      // Edge Case 6: Partner account issues
      return {
        success: false,
        error: {
          type: "transfer_failed",
          message: err.message,
        },
      };
    }
  }

  // ========== Edge Case Handlers ==========

  static async handleFailedPayment(conversion, error) {
    // Update conversion status
    await Conversion.updateOne(
      { _id: conversion._id },
      {
        paymentStatus: "failed",
        failureReason: error.message,
        paymentDetails: {
          errorType: error.type,
          lastAttempt: new Date(),
        },
      }
    );

    // Notify both admin and partner
    await notifyAdmin(
      conversion.campaign.admin,
      `Payment failed for conversion: ${error.message}`
    );
    await notifyPartner(
      conversion.partner,
      `Payment delayed for your conversion: ${error.message}`
    );

    // Edge Case 7: Pause campaign after multiple failures
    const failedCount = await Conversion.countDocuments({
      campaign: conversion.campaign._id,
      paymentStatus: "failed",
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (failedCount > 5) {
      await Campaign.updateOne(
        { _id: conversion.campaign._id },
        { status: "paused", pauseReason: "Excessive payment failures" }
      );
    }
  }

  static async exceedsCampaignBudget(campaign, amount) {
    // Edge Case 8: Check campaign budget limits
    if (!campaign.budget) return false;

    const totalSpent = await Conversion.aggregate([
      { $match: { campaign: campaign._id, paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentTotal = totalSpent[0]?.total || 0;
    return currentTotal + amount > campaign.budget;
  }

  static async handleBudgetExceeded(campaign, conversion) {
    await Conversion.updateOne(
      { _id: conversion._id },
      {
        paymentStatus: "canceled",
        failureReason: "Campaign budget exceeded",
      }
    );

    await Campaign.updateOne(
      { _id: campaign._id },
      { status: "paused", pauseReason: "Budget exceeded" }
    );

    await notifyAdmin(
      campaign.admin,
      "Campaign paused due to budget limit reached"
    );
  }

  // services/paymentService.js

  /**
   * Enhanced payout calculation with additional business rules
   * @param {number} amount - The total conversion amount
   * @param {number} partnerSharePercentage - The percentage share for partner
   * @param {string} [currency='USD'] - Currency code
   * @returns {object} - { partnerAmount, platformFee, currency, breakdown }
   */
  static calculatePayout(amount, partnerSharePercentage, currency = "USD") {
    // Validate inputs
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid amount: must be a positive number");
    }

    if (
      typeof partnerSharePercentage !== "number" ||
      partnerSharePercentage <= 0 ||
      partnerSharePercentage >= 100
    ) {
      throw new Error("Invalid partner share: must be between 0 and 100");
    }

    // Configuration
    const MIN_PAYOUT = 0.5; // Minimum $0.50 payout to partner
    const MIN_PLATFORM_FEE = 0.1; // Minimum $0.10 platform fee
    const ROUNDING = "nearest"; // 'nearest', 'up', or 'down'

    // Convert to cents for precise calculations
    const amountInCents = Math.round(amount * 100);
    const partnerShareDecimal = partnerSharePercentage / 100;

    // Initial calculation
    let partnerAmountInCents = Math.round(amountInCents * partnerShareDecimal);
    let platformFeeInCents = amountInCents - partnerAmountInCents;

    // Apply minimums
    if (partnerAmountInCents < MIN_PAYOUT * 100) {
      partnerAmountInCents = MIN_PAYOUT * 100;
      platformFeeInCents = amountInCents - partnerAmountInCents;
    }

    if (platformFeeInCents < MIN_PLATFORM_FEE * 100) {
      platformFeeInCents = MIN_PLATFORM_FEE * 100;
      partnerAmountInCents = amountInCents - platformFeeInCents;
    }

    // Apply rounding rules
    if (ROUNDING === "up") {
      partnerAmountInCents = Math.ceil(partnerAmountInCents);
      platformFeeInCents = amountInCents - partnerAmountInCents;
    } else if (ROUNDING === "down") {
      partnerAmountInCents = Math.floor(partnerAmountInCents);
      platformFeeInCents = amountInCents - partnerAmountInCents;
    }

    // Convert back to dollars
    const partnerAmount = partnerAmountInCents / 100;
    const platformFee = platformFeeInCents / 100;

    return {
      partnerAmount,
      platformFee,
      currency,
      partnerSharePercentage,
      originalAmount: amount,
      breakdown: {
        beforeMinimums: {
          partnerAmount: Math.round(amountInCents * partnerShareDecimal) / 100,
          platformFee:
            (amountInCents - Math.round(amountInCents * partnerShareDecimal)) /
            100,
        },
        minimumsApplied: {
          partnerMinimum: MIN_PAYOUT,
          platformMinimum: MIN_PLATFORM_FEE,
        },
        rounding: ROUNDING,
      },
    };
  }
}

module.exports = ConversionService;
