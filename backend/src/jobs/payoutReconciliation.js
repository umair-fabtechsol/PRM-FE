// jobs/payoutReconciliation.js
const cron = require("node-cron");
const { stripe } = require("../config/stripe");
const Conversion = require("../models/Conversion");

// Run daily at 2 AM
cron.schedule("0 2 * * *", async () => {
  console.log("Running payout reconciliation...");

  // Find conversions marked as paid but transfer not confirmed
  const unconvertedPayments = await Conversion.find({
    paymentStatus: "paid",
    "paymentDetails.transferStatus": { $ne: "completed" },
  });

  for (const conversion of unconvertedPayments) {
    try {
      const transfer = await stripe.transfers.retrieve(
        conversion.paymentDetails.transferId
      );

      if (transfer.status === "paid") {
        await Conversion.updateOne(
          { _id: conversion._id },
          { "paymentDetails.transferStatus": "completed" }
        );
      } else if (transfer.status === "failed") {
        // Implement retry logic or mark as failed
      }
    } catch (err) {
      console.error(`Error reconciling conversion ${conversion._id}:`, err);
    }
  }
});
