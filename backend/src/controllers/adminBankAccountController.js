// controllers/adminBankAccountController.js
const User = require('../models/userModel');
const { sendEmail } = require('../services/emailService');

exports.addBankAccount = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { 
      accountHolderName,
      accountType, // 'individual' or 'company'
      routingNumber,
      accountNumber,
      currency,
      country
    } = req.body;

    // Verify requesting user is the admin or superadmin
    if (req.user._id.toString() !== adminId && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Create bank account token
    const token = await stripe.tokens.create({
      bank_account: {
        country,
        currency,
        account_holder_name: accountHolderName,
        account_holder_type: accountType,
        routing_number: routingNumber,
        account_number: accountNumber
      }
    });

    // Add to Stripe customer
    const bankAccount = await stripe.customers.createSource(
      admin.stripeCustomerId,
      { source: token.id }
    );

    // Verify the bank account (Stripe will make micro-deposits)
    await stripe.customers.verifySource(
      admin.stripeCustomerId,
      bankAccount.id,
      { amounts: [32, 45] } // In production, you'll need to collect these from the admin
    );

    // Save bank account details (store only reference, not sensitive data)
    admin.bankAccount = {
      bankAccountId: bankAccount.id,
      last4: bankAccount.last4,
      bankName: bankAccount.bank_name,
      country: bankAccount.country,
      currency: bankAccount.currency,
      status: 'pending_verification',
      verified: false
    };
    await admin.save();

    res.json({
      success: true,
      message: 'Bank account added. Verification deposits will arrive in 1-2 business days.',
      bankAccount: {
        id: bankAccount.id,
        bankName: bankAccount.bank_name,
        last4: bankAccount.last4,
        country: bankAccount.country,
        status: 'pending_verification'
      }
    });

  } catch (error) {
    console.error('Error adding bank account:', error);
    res.status(500).json({ 
      error: 'Failed to add bank account',
      details: error.message 
    });
  }
};

exports.verifyBankAccount = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { amount1, amount2 } = req.body;

    // Verify requesting user is the admin or superadmin
    if (req.user._id.toString() !== adminId && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const admin = await User.findById(adminId);
    if (!admin || !admin.bankAccount?.bankAccountId) {
      return res.status(404).json({ error: 'Bank account not found' });
    }

    // Verify with Stripe
    await stripe.customers.verifySource(
      admin.stripeCustomerId,
      admin.bankAccount.bankAccountId,
      { amounts: [amount1, amount2] }
    );

    // Update status
    admin.bankAccount.status = 'verified';
    admin.bankAccount.verified = true;
    admin.bankAccount.verifiedAt = new Date();
    await admin.save();

    res.json({
      success: true,
      message: 'Bank account successfully verified',
      bankAccount: {
        id: admin.bankAccount.bankAccountId,
        bankName: admin.bankAccount.bankName,
        last4: admin.bankAccount.last4,
        status: 'verified'
      }
    });

  } catch (error) {
    console.error('Error verifying bank account:', error);
    res.status(500).json({ 
      error: 'Failed to verify bank account',
      details: error.message 
    });
  }
};

exports.getBankAccounts = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Verify requesting user is the admin or superadmin
    if (req.user._id.toString() !== adminId && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Retrieve from Stripe
    const bankAccounts = await stripe.customers.listSources(
      admin.stripeCustomerId,
      { object: 'bank_account' }
    );

    // Return safe information only
    const sanitizedAccounts = bankAccounts.data.map(account => ({
      id: account.id,
      bankName: account.bank_name,
      last4: account.last4,
      country: account.country,
      currency: account.currency,
      status: account.status,
      default_for_currency: account.default_for_currency
    }));

    res.json({
      success: true,
      bankAccounts: sanitizedAccounts
    });

  } catch (error) {
    console.error('Error getting bank accounts:', error);
    res.status(500).json({ error: 'Failed to get bank accounts' });
  }
};

exports.handleBankAccountWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_BANK_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle bank account verification
  if (event.type === 'account.external_account.verified') {
    const bankAccount = event.data.object;
    
    try {
      // Find admin with this bank account
      const admin = await User.findOne({ 
        'bankAccount.bankAccountId': bankAccount.id 
      });
      
      if (admin) {
        admin.bankAccount.status = 'verified';
        admin.bankAccount.verified = true;
        admin.bankAccount.verifiedAt = new Date();
        await admin.save();

        // Notify admin
        await sendEmail({
          to: admin.email,
          subject: 'Bank Account Verified',
          template: 'bankAccountVerified'
        });
      }
    } catch (error) {
      console.error('Error handling bank account webhook:', error);
    }
  }

  res.json({ received: true });
};