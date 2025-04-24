// jobs/scheduledJobs.js
const cron = require('node-cron');
const {
  reconcilePendingPayments,
  flagSuspiciousActivity,
  processRetryFailures
} = require('./reconciliation');
const { sendDailyReport } = require('../services/reportingService');

// Daily at 3 AM
cron.schedule('0 3 * * *', async () => {
  console.log('Starting daily reconciliation jobs...');
  const startTime = Date.now();
  
  try {
    // Run reconciliation tasks sequentially
    const paymentResults = await reconcilePendingPayments();
    const activityResults = await flagSuspiciousActivity();
    const retryResults = await processRetryFailures();

    // Send summary report
    await sendDailyReport({
      timestamp: new Date(),
      duration: (Date.now() - startTime) / 1000,
      payments: paymentResults,
      activity: activityResults,
      retries: retryResults,
      status: 'completed'
    });

    console.log('Daily reconciliation jobs completed successfully');
  } catch (err) {
    console.error('Daily reconciliation jobs failed:', err);
    
    await sendDailyReport({
      timestamp: new Date(),
      duration: (Date.now() - startTime) / 1000,
      error: err.message,
      status: 'failed'
    });
  }
});

// Additional monitoring every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('Running periodic monitoring...');
  
  // Check for critical payment failures
  const criticalFailures = await Conversion.countDocuments({
    paymentStatus: 'failed',
    createdAt: { $gte: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    failureReason: { $regex: /insufficient|declined/i }
  });

  if (criticalFailures > 10) {
    await notifyAdmin(
      'superadmin',
      `URGENT: ${criticalFailures} payment failures in last 6 hours`
    );
  }
});
