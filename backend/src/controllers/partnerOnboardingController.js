// controllers/partnerOnboardingController.js
const { stripe } = require('../config/stripe');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const AccountManager = require('../utils/accountManager');

exports.initiatePartnerOnboarding = async (req, res) => {
  try {
    const { partnerId } = req.params;
    
    // Verify requesting user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can onboard partners' });
    }

    // Get partner details
    const partner = await User.findById(partnerId);
    if (!partner || partner.role !== 'partner') {
      return res.status(404).json({ error: 'Partner not found' });
    }

    // Check if already has Stripe account
    if (partner.stripeAccountId) {
      return res.status(400).json({ error: 'Partner already has a Stripe account' });
    }

    // Create connected account
    const account = await AccountManager.createConnectedAccount(partner);

    // Generate onboarding link
    const onboardingLink = await AccountManager.generateOnboardingLink(
      account.id,
      `${process.env.FRONTEND_URL}/partner/reauth`,
      `${process.env.FRONTEND_URL}/partner/dashboard`
    );

    // Save Stripe account ID to partner
    partner.stripeAccountId = account.id;
    partner.accountStatus = 'pending_onboarding';
    await partner.save();

    // Send onboarding email to partner
    await sendEmail({
      to: partner.email,
      subject: 'Complete Your Payment Account Setup',
      template: 'partnerOnboarding',
      data: {
        partnerName: partner.name,
        onboardingUrl: onboardingLink.url,
        adminName: req.user.name,
        expiresIn: '30 minutes' // Stripe links typically expire in 30 mins
      }
    });

    res.json({
      success: true,
      message: 'Onboarding initiated. Partner will receive an email with instructions.',
      partnerId: partner._id,
      stripeAccountId: account.id
    });

  } catch (error) {
    console.error('Error initiating partner onboarding:', error);
    res.status(500).json({ 
      error: 'Failed to initiate partner onboarding',
      details: error.message 
    });
  }
};

exports.handleOnboardingWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_ONBOARDING_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle account updates
  if (event.type === 'account.updated') {
    const account = event.data.object;
    
    try {
      const partner = await User.findOne({ stripeAccountId: account.id });
      if (!partner) return res.json({ received: true });

      // Update partner account status based on Stripe account
      if (account.charges_enabled && account.payouts_enabled) {
        partner.accountStatus = 'active';
        await partner.save();
        
        // Notify partner and admin
        await Promise.all([
          sendEmail({
            to: partner.email,
            subject: 'Your Payment Account is Ready',
            template: 'partnerAccountReady'
          }),
          sendEmail({
            to: partner.createdBy, // Assuming we track who created the partner
            subject: `Partner ${partner.name} account setup complete`,
            template: 'adminPartnerAccountReady'
          })
        ]);
      }
    } catch (error) {
      console.error('Error handling onboarding webhook:', error);
    }
  }

  res.json({ received: true });
};

exports.getOnboardingStatus = async (req, res) => {
  try {
    const { partnerId } = req.params;
    
    // Verify requesting user has access
    if (req.user.role !== 'admin' && req.user._id.toString() !== partnerId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const partner = await User.findById(partnerId);
    if (!partner || !partner.stripeAccountId) {
      return res.status(404).json({ error: 'Partner account not found' });
    }

    // Check Stripe account status
    const accountStatus = await AccountManager.checkAccountRequirements(partner.stripeAccountId);

    res.json({
      partnerId: partner._id,
      stripeAccountId: partner.stripeAccountId,
      accountStatus: partner.accountStatus,
      stripeRequirements: accountStatus.requirements,
      detailsSubmitted: accountStatus.detailsSubmitted,
      chargesEnabled: accountStatus.charges_enabled,
      payoutsEnabled: accountStatus.payouts_enabled
    });

  } catch (error) {
    console.error('Error getting onboarding status:', error);
    res.status(500).json({ error: 'Failed to get onboarding status' });
  }
};