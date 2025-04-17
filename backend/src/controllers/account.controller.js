// controllers/accountController.js
const { stripe, createConnectedAccount, generateOnboardingLink } = require('../config/stripe');

exports.createAdminAccount = async (req, res) => {
  try {
    // Create Stripe customer for admin
    const customer = await stripe.customers.create({
      email: req.user.email,
      name: req.user.businessName,
      metadata: { userId: req.user._id.toString() }
    });

    // Save customer ID to admin record
    req.user.stripeCustomerId = customer.id;
    await req.user.save();

    res.json({ success: true, stripeCustomerId: customer.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPartnerAccount = async (req, res) => {
  try {
    // Create connected account for partner
    const account = await createConnectedAccount('partner', req.user.email);
    
    // Generate onboarding link
    const onboardingLink = await generateOnboardingLink(account.id);
    
    // Save to partner record
    req.user.stripeAccountId = account.id;
    req.user.stripeAccountStatus = 'pending';
    await req.user.save();

    res.json({ onboardingUrl: onboardingLink.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveAdminPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.attach(
      req.body.paymentMethodId,
      { customer: req.user.stripeCustomerId }
    );

    // Set as default payment method
    await stripe.customers.update(
      req.user.stripeCustomerId,
      { invoice_settings: { default_payment_method: paymentMethod.id } }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};