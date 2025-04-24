// services/smsService.js
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS({ to, message }) {
  try {
    if (!to) return false;

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

module.exports = { sendSMS };
