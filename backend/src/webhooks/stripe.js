// webhooks/stripeWebhooks.js
const { stripe } = require("../config/stripe");
const PaymentService = require("../services/paymentService");
const Campaign = require("../models/Campaign");

const webhookHandlers = {
  "payment_intent.succeeded": async (paymentIntent) => {
    // Already handled in processConversion
  },

  "payment_intent.payment_failed": async (paymentIntent) => {
    const conversionId = paymentIntent.metadata.conversionId;
    const error = paymentIntent.last_payment_error || {
      message: "Unknown error",
    };

    await PaymentService.handleFailedPayment(conversionId, {
      type: "payment_failed",
      message: error.message,
      code: error.code,
    });
  },

  "account.updated": async (account) => {
    // Edge Case 9: Handle partner account status changes
    if (account.requirements.disabled_reason) {
      const partner = await User.findOne({ stripeAccountId: account.id });
      if (partner) {
        await notifyPartner(
          partner._id,
          `Your payout account needs attention: ${account.requirements.disabled_reason}`
        );
      }
    }
  },

  "transfer.failed": async (transfer) => {
    // Edge Case 10: Handle failed transfers to partners
    await Conversion.updateOne(
      { "paymentDetails.transferId": transfer.id },
      {
        "paymentDetails.transferStatus": "failed",
        "paymentDetails.failureReason": transfer.failure_message,
      }
    );

    // Attempt to re-create transfer after resolving issues
    if (transfer.failure_code === "account_disabled") {
      const partner = await User.findOne({
        stripeAccountId: transfer.destination,
      });
      await notifyPartner(
        partner._id,
        "Your account needs verification to receive payments"
      );
    }
  },

  "charge.dispute.created": async (dispute) => {
    // Edge Case 11: Handle payment disputes
    const conversion = await Conversion.findOne({
      "paymentDetails.chargeId": dispute.charge,
    });

    if (conversion) {
      await Conversion.updateOne(
        { _id: conversion._id },
        { paymentStatus: "disputed" }
      );

      await Campaign.updateOne(
        { _id: conversion.campaign },
        { $inc: { disputeCount: 1 } }
      );
    }
  },
};

module.exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific events
  if (webhookHandlers[event.type]) {
    try {
      await webhookHandlers[event.type](event.data.object);
    } catch (err) {
      console.error(`Error handling ${event.type}:`, err);
      // Implement your error tracking here
    }
  }

  res.json({ received: true });
};
