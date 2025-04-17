// controllers/conversionController.js
const PaymentService = require('../services/paymentService');

exports.trackConversion = async (req, res) => {
  try {
    const { campaignId, partnerId, amount, metadata } = req.body;
    
    // Create conversion record
    const conversion = await Conversion.create({
      campaign: campaignId,
      partner: partnerId,
      amount,
      metadata,
      paymentStatus: 'pending'
    });

    // Process payment async (use queue in production)
    PaymentService.processConversion(conversion._id)
      .catch(err => console.error('Payment processing error:', err));

    res.json({ success: true, conversionId: conversion._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPartnerPayouts = async (req, res) => {
  try {
    const payouts = await stripe.payouts.list({
      destination: req.user.stripeAccountId,
      limit: 100
    });

    res.json({ payouts: payouts.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};