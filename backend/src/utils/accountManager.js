// utils/accountManager.js
const { stripe } = require("../config/stripe");

class AccountManager {
  static async createConnectedAccount(user, country = "US") {
    const account = await stripe.accounts.create({
      type: "express",
      country ,
      email: user.email,
      capabilities: {
        transfers: { requested: true },
      },
      business_type: "individual",
      individual: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: user.phone,
        address: {
          line1: user.address?.street,
          city: user.address?.city,
          state: user.address?.state,
          postal_code: user.address?.postalCode,
          country: user.address?.country
        }
      },
      metadata: {
        userId: user._id.toString(),
        userType: user.role,
      },
    });

    return account;
  }

  static async verifyBankAccount(accountId, bankDetails) {
    // For US bank accounts
    const token = await stripe.tokens.create({
      bank_account: {
        country: "US",
        currency: "usd",
        account_holder_name: bankDetails.accountHolderName,
        account_holder_type: bankDetails.accountType,
        routing_number: bankDetails.routingNumber,
        account_number: bankDetails.accountNumber,
      },
    });

    const bankAccount = await stripe.accounts.createExternalAccount(accountId, {
      external_account: token.id,
    });

    return bankAccount;
  }

  static async checkAccountRequirements(accountId) {
    const account = await stripe.accounts.retrieve(accountId);
    return {
      status: account.charges_enabled ? "active" : "pending",
      requirements: account.requirements,
      detailsSubmitted: account.details_submitted,
    };
  }

  static async generateOnboardingLink(accountId, refreshUrl, returnUrl) {
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding",
    });
  }
}

module.exports = AccountManager;
