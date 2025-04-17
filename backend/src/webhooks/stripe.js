// webhooks/stripeWebhooks.js
const { stripe } = require('../config/stripe');
const PaymentService = require('../services/paymentService');

const webhookHandlers = {
  'payment_intent.succeeded': async (paymentIntent) => {
    // Payment was successful (already handled in processConversion)
  },
  'payment_intent.payment_failed': async (paymentIntent) => {
    const conversionId = paymentIntent.metadata.conversionId;
    await PaymentService.handleFailedPayment(conversionId);
  },
  'transfer.paid': async (transfer) => {
    // Partner received their funds
    await Conversion.updateOne(
      { 'paymentDetails.transferId': transfer.id },
      { 'paymentDetails.transferStatus': 'completed' }
    );
  },
  'transfer.failed': async (transfer) => {
    // Handle failed transfer to partner
    await Conversion.updateOne(
      { 'paymentDetails.transferId': transfer.id },
      { 'paymentDetails.transferStatus': 'failed' }
    );
    // Implement retry logic here
  }
};

module.exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
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

  if (webhookHandlers[event.type]) {
    await webhookHandlers[event.type](event.data.object);
  }

  res.json({ received: true });
};