// utils/stripe.js

// Attach a payment method to admin account for direct debit
async function setupAdminForDirectDebit(adminId, paymentMethodId) {
  const admin = await User.findById(adminId);

  // Attach payment method to admin's Stripe customer
  const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: admin.stripeCustomerId,
  });

  // Set as default payment method
  await stripe.customers.update(admin.stripeCustomerId, {
    invoice_settings: { default_payment_method: paymentMethod.id },
    metadata: { direct_debit_enabled: true },
  });

  return paymentMethod;
}

// Charge admin when conversion occurs
async function chargeAdminForConversion(adminId, amount, conversionId) {
  const admin = await User.findById(adminId);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: "usd",
      customer: admin.stripeCustomerId,
      payment_method: admin.defaultPaymentMethodId,
      off_session: true, // Important for automatic charges
      confirm: true,
      metadata: { conversionId },
      description: `Conversion charge for ${conversionId}`,
    });

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
    };
  } catch (err) {
    // Handle specific decline codes
    if (err.code === "authentication_required") {
      // Notify admin to re-authenticate
      await notifyAdminForReauth(adminId);
    }
    return { success: false, error: err };
  }
}

// Complete payment flow with retry logic
async function processConversionPayment(conversion) {
  const { admin, amount, partner, platformFee } = conversion;

  // 1. Charge admin
  const chargeResult = await chargeAdminForConversion(
    admin._id,
    amount,
    conversion._id
  );

  if (!chargeResult.success) {
    // Implement retry logic (3 attempts with exponential backoff)
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i * 2)));
      const retryResult = await chargeAdminForConversion(
        admin._id,
        amount,
        conversion._id
      );
      if (retryResult.success) {
        chargeResult = retryResult;
        break;
      }
    }

    if (!chargeResult.success) {
      await handleFailedPayment(conversion);
      return;
    }
  }

  // 2. Transfer to partner
  await transferToPartner(
    partner._id,
    amount - platformFee,
    conversion._id,
    chargeResult.paymentIntentId
  );

  // 3. Update conversion status
  await Conversion.updateOne(
    { _id: conversion._id },
    { paymentStatus: "completed" }
  );
}

// For SEPA Direct Debit
async function createSepaMandate(adminId, iban) {
  const admin = await User.findById(adminId);

  const paymentMethod = await stripe.paymentMethods.create({
    type: "sepa_debit",
    sepa_debit: { iban },
    billing_details: {
      name: admin.businessName,
      email: admin.email,
    },
  });

  // Attach to customer
  await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: admin.stripeCustomerId,
  });

  // Create mandate
  const setupIntent = await stripe.setupIntents.create({
    customer: admin.stripeCustomerId,
    payment_method: paymentMethod.id,
    payment_method_types: ["sepa_debit"],
    mandate_data: {
      customer_acceptance: {
        type: "online",
        online: {
          ip_address: "127.0.0.1", // Use actual IP
          user_agent: "YourPlatform/1.0",
        },
      },
    },
  });

  return setupIntent.client_secret;
}

// Get admin's payment methods
async function getAdminPaymentMethods(adminId) {
  const admin = await User.findById(adminId);
  return await stripe.paymentMethods.list({
    customer: admin.stripeCustomerId,
    type: "card", // or 'sepa_debit', 'us_bank_account' etc.
  });
}

// Webhook for failed payments
app.post("/webhooks/stripe", async (req, res) => {
  const event = req.body;

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const conversionId = paymentIntent.metadata.conversionId;

    // Notify admin and potentially pause campaigns
    await handlePaymentFailure(conversionId);
  }

  res.json({ received: true });
});


// Example Radar rule to prevent fraud
await stripe.radar.valueLists.create({
  alias: 'blocked_ips',
  name: 'Blocked IPs',
  item_type: 'ip_address',
  items: ['123.456.789.0'] // Add suspicious IPs
});

