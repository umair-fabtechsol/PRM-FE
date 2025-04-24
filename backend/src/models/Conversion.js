// models/Conversion.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversionSchema = new Schema({
  // References
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: [true, 'Campaign reference is required']
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Partner reference is required']
  },
  
  // Transaction Details
  amount: {
    type: Number,
    required: [true, 'Conversion amount is required'],
    min: [0.01, 'Amount must be at least 0.01']
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP'] // Add other currencies as needed
  },
  
  // Payment Tracking
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'canceled', 'disputed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    chargeId: String,       // Stripe charge ID
    transferId: String,     // Stripe transfer ID
    transferStatus: String, // 'pending', 'paid', 'failed'
    amountPaid: Number,     // Amount sent to partner
    platformFee: Number,    // Amount kept by platform
    failureReason: String,
    errorType: String,
    lastAttempt: Date
  },
  
  // Tracking Information
  trackingData: {
    ipAddress: String,
    userAgent: String,
    deviceType: String,
    browser: String,
    os: String,
    referrer: String,
    landingPage: String
  },
  
  // UTM Parameters
  utmParameters: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String
  },
  
  // Custom Conversion Data
  customData: Map,
  
  // Reconciliation Fields
  reconciliationAttempts: {
    type: Number,
    default: 0
  },
  finalAttempt: Boolean,
  
  // System Fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date,
  completedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for partner earnings
conversionSchema.virtual('partnerEarnings').get(function() {
  if (!this.paymentDetails?.amountPaid) return null;
  return this.paymentDetails.amountPaid;
});

// Virtual for platform earnings
conversionSchema.virtual('platformEarnings').get(function() {
  if (!this.paymentDetails?.platformFee) return null;
  return this.paymentDetails.platformFee;
});

// Indexes for performance
conversionSchema.index({ campaign: 1 });
conversionSchema.index({ partner: 1 });
conversionSchema.index({ paymentStatus: 1 });
conversionSchema.index({ createdAt: -1 });
conversionSchema.index({ 'paymentDetails.chargeId': 1 }, { unique: true, sparse: true });
conversionSchema.index({ 'paymentDetails.transferId': 1 }, { unique: true, sparse: true });

// Pre-save hooks
conversionSchema.pre('save', function(next) {
  if (this.isModified('paymentStatus') && this.paymentStatus === 'paid') {
    this.processedAt = new Date();
  }
  if (this.isModified('paymentStatus') && this.paymentStatus === 'completed') {
    this.completedAt = new Date();
  }
  next();
});

// Post-save hook to update campaign totals
conversionSchema.post('save', async function(doc) {
  if (doc.paymentStatus === 'paid') {
    const campaign = await mongoose.model('Campaign').findById(doc.campaign);
    if (campaign) {
      campaign.totalConversions += 1;
      campaign.totalValue += doc.amount;
      await campaign.save();
    }
  }
});

// Static methods
conversionSchema.statics.findByCampaign = function(campaignId) {
  return this.find({ campaign: campaignId });
};

conversionSchema.statics.findByPartner = function(partnerId) {
  return this.find({ partner: partnerId });
};

conversionSchema.statics.failedConversions = function() {
  return this.find({ paymentStatus: 'failed' });
};

// Instance methods
conversionSchema.methods.markAsPaid = async function(paymentDetails) {
  this.paymentStatus = 'paid';
  this.paymentDetails = paymentDetails;
  return this.save();
};

conversionSchema.methods.retryPayment = async function() {
  if (this.paymentStatus === 'failed') {
    this.paymentStatus = 'pending';
    this.reconciliationAttempts += 1;
    return this.save();
  }
  throw new Error('Only failed conversions can be retried');
};

const Conversion = mongoose.models.Conversion || mongoose.model('Conversion', conversionSchema);

module.exports = Conversion;