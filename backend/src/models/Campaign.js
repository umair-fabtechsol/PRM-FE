// models/Campaign.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Ownership and Access
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Admin reference is required']
  },
  partners: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Tracking Configuration
  targetWebsite: {
    type: String,
    required: [true, 'Target website URL is required'],
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid website URL!`
    }
  },
  cssSelector: {
    type: String,
    required: [true, 'CSS selector is required for conversion tracking']
  },
  conversionValue: {
    type: Number,
    required: [true, 'Conversion value is required'],
    min: [0.01, 'Conversion value must be at least 0.01']
  },
  
  // Financial Settings
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative']
  },
  partnerShare: {
    type: Number,
    required: [true, 'Partner share percentage is required'],
    min: [1, 'Partner share must be at least 1%'],
    max: [99, 'Partner share cannot exceed 99%']
  },
  platformFee: {
    type: Number,
    default: 20,
    min: [0, 'Platform fee cannot be negative'],
    max: [100, 'Platform fee cannot exceed 100%']
  },
  
  // Status and Timing
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'under_review'],
    default: 'draft'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  
  // Tracking and Analytics
  totalConversions: {
    type: Number,
    default: 0
  },
  totalValue: {
    type: Number,
    default: 0
  },
  disputeCount: {
    type: Number,
    default: 0
  },
  
  // Metadata
  utmParameters: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String
  },
  customTrackingParams: Map,
  
  // System Fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for remaining budget
campaignSchema.virtual('remainingBudget').get(function() {
  if (!this.budget) return null;
  return this.budget - this.totalValue;
});

// Indexes for performance
campaignSchema.index({ admin: 1 });
campaignSchema.index({ status: 1 });
campaignSchema.index({ targetWebsite: 1 });
campaignSchema.index({ createdAt: -1 });

// Pre-save hook to update calculated fields
campaignSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static methods
campaignSchema.statics.findByAdmin = function(adminId) {
  return this.find({ admin: adminId });
};

campaignSchema.statics.activeCampaigns = function() {
  return this.find({ status: 'active' });
};

// Instance methods
campaignSchema.methods.addPartner = function(partnerId) {
  if (!this.partners.includes(partnerId)) {
    this.partners.push(partnerId);
  }
  return this.save();
};

campaignSchema.methods.pause = function(reason) {
  this.status = 'paused';
  if (reason) this.pauseReason = reason;
  return this.save();
};

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;