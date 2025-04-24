// services/notificationService.js
const User = require("../models/User");
const Campaign = require("../models/Campaign");
const Conversion = require("../models/Conversion");
const { sendEmail } = require("./emailService");
const { sendSMS } = require("./smsService");
const { createPlatformNotification } = require("./internalNotificationService");

class NotificationService {
  /**
   * Send payment failure notification to relevant parties
   * @param {Object} params
   * @param {Object} params.recipient - User model instance
   * @param {Object} params.campaign - Campaign model instance
   * @param {Object} params.partner - Partner User model instance
   * @param {Object} params.conversion - Conversion model instance
   * @param {string} params.errorType - Type of error (transfer_failed, processing_error, etc.)
   * @param {string} params.errorMessage - Detailed error message
   */
  static async sendPaymentFailureNotification(params) {
    const {
      recipient,
      campaign,
      partner,
      conversion,
      errorType,
      errorMessage,
    } = params;

    try {
      // Determine notification content based on recipient role
      let subject, template, smsContent, internalMessage;

      if (recipient.role === "superadmin") {
        subject = `URGENT: Payment Failure - Campaign ${campaign.name}`;
        template = "paymentFailureAdmin";
        smsContent = `Payment failed for campaign ${campaign.name}. Amount: $${conversion.amount}. Error: ${errorMessage}`;
        internalMessage = `System detected payment failure (${errorType}) for conversion ${conversion._id}`;
      } else if (recipient.role === "admin") {
        subject = `Payment to Partner Failed - ${campaign.name}`;
        template = "paymentFailureAdmin";
        smsContent = `Payment to partner failed for ${campaign.name}. Amount: $${conversion.amount}`;
        internalMessage = `Payment to partner ${partner.email} failed for conversion ${conversion._id}`;
      } else {
        // Partners shouldn't normally receive failure notifications from this service
        return;
      }

      // Prepare common data for all notification types
      const notificationData = {
        campaignName: campaign.name,
        partnerName: partner.name || partner.email,
        amount: conversion.amount,
        errorType,
        errorMessage,
        conversionId: conversion._id,
        timestamp: new Date(),
        dashboardLink: `${process.env.DASHBOARD_URL}/conversions/${conversion._id}`,
      };

      // Send notifications through all channels
      await Promise.all([
        // Email notification
        sendEmail({
          to: recipient.email,
          subject,
          template,
          data: notificationData,
        }),

        // SMS alert for critical failures
        errorType === "transfer_failed"
          ? sendSMS({
              to: recipient.phone,
              message: smsContent,
            })
          : Promise.resolve(),

        // Internal platform notification
        createPlatformNotification({
          userId: recipient._id,
          type: "payment_failure",
          title: subject,
          message: internalMessage,
          metadata: {
            conversionId: conversion._id,
            campaignId: campaign._id,
            partnerId: partner._id,
          },
        }),
      ]);

      console.log(`Sent payment failure notification to ${recipient.email}`);
    } catch (error) {
      console.error("Error sending payment failure notification:", error);
      // Fail silently but log the error
    }
  }

  /**
   * Notify partner about successful payment
   * @param {Object} partner - User model instance
   * @param {Object} conversion - Conversion model instance
   * @param {number} amountPaid - Amount paid to partner
   */
  static async sendPartnerPaymentSuccess(partner, conversion, amountPaid) {
    try {
      const campaign = await Campaign.findById(conversion.campaign);

      await Promise.all([
        sendEmail({
          to: partner.email,
          subject: `Payment Received - $${amountPaid}`,
          template: "partnerPaymentSuccess",
          data: {
            amount: amountPaid,
            campaignName: campaign.name,
            conversionId: conversion._id,
            date: new Date().toLocaleDateString(),
            dashboardLink: `${process.env.DASHBOARD_URL}/earnings`,
          },
        }),

        createPlatformNotification({
          userId: partner._id,
          type: "payment_received",
          title: `Payment of $${amountPaid} received`,
          message: `You've been paid for your contribution to ${campaign.name}`,
          metadata: {
            conversionId: conversion._id,
            amount: amountPaid,
          },
        }),
      ]);
    } catch (error) {
      console.error(
        "Error sending partner payment success notification:",
        error
      );
    }
  }

  /**
   * Notify admin about low balance
   * @param {Object} admin - User model instance
   * @param {number} currentBalance - Current account balance
   * @param {number} threshold - Threshold that was crossed
   */
  static async sendLowBalanceAlert(admin, currentBalance, threshold) {
    try {
      const subject = `Low Balance Alert - Current: $${currentBalance}`;

      await Promise.all([
        sendEmail({
          to: admin.email,
          subject,
          template: "lowBalanceAlert",
          data: {
            currentBalance,
            threshold,
            rechargeLink: `${process.env.DASHBOARD_URL}/billing/recharge`,
          },
        }),

        sendSMS({
          to: admin.phone,
          message: `Your account balance ($${currentBalance}) is below $${threshold}. Please recharge.`,
        }),

        createPlatformNotification({
          userId: admin._id,
          type: "low_balance",
          title: "Low Account Balance",
          message: `Your balance of $${currentBalance} is below the $${threshold} threshold`,
          metadata: {
            currentBalance,
            threshold,
          },
        }),
      ]);
    } catch (error) {
      console.error("Error sending low balance alert:", error);
    }
  }

  /**
   * Notify about campaign automatic pause due to payment failures
   * @param {Object} admin - User model instance
   * @param {Object} campaign - Campaign model instance
   * @param {number} failureCount - Number of consecutive failures
   */
  static async sendCampaignPausedNotification(admin, campaign, failureCount) {
    try {
      const subject = `Campaign Paused: ${campaign.name}`;

      await Promise.all([
        sendEmail({
          to: admin.email,
          subject,
          template: "campaignPaused",
          data: {
            campaignName: campaign.name,
            failureCount,
            reactivateLink: `${process.env.DASHBOARD_URL}/campaigns/${campaign._id}/reactivate`,
          },
        }),

        createPlatformNotification({
          userId: admin._id,
          type: "campaign_paused",
          title: "Campaign Automatically Paused",
          message: `${campaign.name} was paused after ${failureCount} payment failures`,
          metadata: {
            campaignId: campaign._id,
            failureCount,
          },
        }),
      ]);
    } catch (error) {
      console.error("Error sending campaign paused notification:", error);
    }
  }
}

module.exports = NotificationService;
