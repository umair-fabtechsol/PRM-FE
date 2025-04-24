// services/emailService.js
const nodemailer = require("nodemailer");
const emailTemplates = require("../emailTemplates");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ to, subject, template, data }) {
  try {
    const templateFn = emailTemplates[template];
    if (!templateFn) {
      throw new Error(`Email template ${template} not found`);
    }

    const { html, text } = templateFn(data);

    await transporter.sendMail({
      from: EMAIL_FROM_CONFIG,
      to,
      subject,
      text,
      html,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendEmail };
