// services/paymentService.js
const { stripe } = require('../config/stripe');
const Conversion = require('../models/Conversion');
const Campaign = require('../models/Campaign');

class PaymentService {
  static async processConversion(conversionId) {
    const conversion = await Conversion.findById(conversionId)
      .populate('campaign')
      .populate('partner');
    
    const campaign = conversion.campaign;
    const admin = campaign.admin;
    const partner = conversion.partner;

    // 1. Charge the admin
    const paymentIntent = await stripe.paymentIntents.create({
      amount: conversion.amount * 100, // Convert to cents
      currency: 'usd',
      customer: admin.stripeCustomerId,
      payment_method: admin.stripePaymentMethodId,
      confirm: true,
      metadata: {
        conversionId: conversion._id.toString(),
        campaignId: campaign._id.toString(),
      },
      transfer_group: `campaign_${campaign._id}`,
    });

    if (paymentIntent.status !== 'succeeded') {
      throw new Error(`Payment failed: ${paymentIntent.last_payment_error?.message}`);
    }

    // 2. Calculate amounts (platform keeps 20%, partner gets 80%)
    const platformFee = Math.floor(conversion.amount * 0.2 * 100);
    const partnerAmount = conversion.amount * 100 - platformFee;

    // 3. Transfer to partner
    const transfer = await stripe.transfers.create({
      amount: partnerAmount,
      currency: 'usd',
      destination: partner.stripeAccountId,
      metadata: {
        conversionId: conversion._id.toString(),
        campaignId: campaign._id.toString(),
      },
    });

    // 4. Update records
    conversion.paymentStatus = 'paid';
    conversion.paymentDetails = {
      chargeId: paymentIntent.id,
      transferId: transfer.id,
      amountPaid: partnerAmount / 100,
      platformFee: platformFee / 100,
    };
    await conversion.save();

    return conversion;
  }

  static async handleFailedPayment(conversionId) {
    const conversion = await Conversion.findById(conversionId)
      .populate('campaign');
    
    conversion.paymentStatus = 'failed';
    await conversion.save();
    
    // Notify admin and potentially pause campaign
    await notifyAdminPaymentFailed(conversion.campaign.admin, conversion);
    
    if (shouldPauseCampaign(conversion.campaign)) {
      await Campaign.pause(conversion.campaign._id);
    }
  }
}

module.exports = PaymentService;