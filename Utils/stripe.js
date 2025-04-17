// config/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN;

module.exports = {
  stripe,
  createConnectedAccount: async (userType, email) => {
    const account = await stripe.accounts.create({
      type: 'express',
      email,
      capabilities: {
        transfers: { requested: true },
      },
      metadata: { user_type: userType },
    });
    return account;
  },
  generateOnboardingLink: async (accountId) => {
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${DOMAIN}/reauth`,
      return_url: `${DOMAIN}/dashboard`,
      type: 'account_onboarding',
    });
  }
};