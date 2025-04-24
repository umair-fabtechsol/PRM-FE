// models/User.js (relevant parts only)
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // Basic Info
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'partner'],
    required: true
  },
  
  // Stripe Integration
  stripeCustomerId: String,
  stripeAccountId: String,       // For partners
  stripePaymentMethodId: String, // For admins
  defaultPaymentMethod: String,
  
  // Bank Account Info (for payouts)
  bankAccount: {
    accountHolderName: String,
    accountType: String, // 'individual' or 'company'
    routingNumber: String,
    accountNumber: String,
    currency: String,
    country: String,
    verified: Boolean
  },
  
  // Campaign Stats (for partners)
  campaignStats: {
    totalConversions: Number,
    totalEarnings: Number,
    avgConversionValue: Number
  },
  
  // Status
  accountStatus: {
    type: String,
    enum: ['active', 'pending', 'suspended', 'under_review'],
    default: 'pending'
  },
  
  // Other fields...
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User