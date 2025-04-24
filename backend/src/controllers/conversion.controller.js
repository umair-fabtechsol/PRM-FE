// controllers/conversionController.js
const stripe = require("@/Utils/stripe");
const Conversion = require("../models/Conversion");
const ConversionService = require("../services/conversionService");


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
    ConversionService.processConversion(conversion._id, ['admin'])
      .catch(err => console.error('Payment processing error:', err));

    ConversionService.chargeAdmin(conversion._id)
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