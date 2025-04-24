// emailTemplates.js
module.exports = {
  paymentFailureAdmin: (data) => {
    return {
      subject: `Payment Failure - ${data.campaignName}`,
      text: `
          Payment to partner ${data.partnerName} failed for campaign ${data.campaignName}.
          
          Amount: $${data.amount}
          Error: ${data.errorMessage}
          
          Please review the conversion: ${data.dashboardLink}
          
          Timestamp: ${data.timestamp}
        `,
      html: `
          <h1>Payment Failure</h1>
          <p>Payment to partner <strong>${data.partnerName}</strong> failed for campaign <strong>${data.campaignName}</strong>.</p>
          
          <p><strong>Amount:</strong> $${data.amount}</p>
          <p><strong>Error:</strong> ${data.errorMessage}</p>
          
          <p>Please <a href="${data.dashboardLink}">review the conversion</a>.</p>
          
          <p><small>Timestamp: ${data.timestamp}</small></p>
        `,
    };
  },

  partnerPaymentSuccess: (data) => {
    return {
      text: `
          You've received a payment of $${data.amount} for your contribution to ${data.campaignName}.
          
          Conversion ID: ${data.conversionId}
          Date: ${data.date}
          
          View details: ${data.dashboardLink}
        `,
      html: `
          <h1>Payment Received</h1>
          <p>You've received a payment of <strong>$${data.amount}</strong> for your contribution to <strong>${data.campaignName}</strong>.</p>
          
          <p><strong>Conversion ID:</strong> ${data.conversionId}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          
          <p><a href="${data.dashboardLink}">View payment details</a></p>
        `,
    };
  },

  // Additional templates...
};
