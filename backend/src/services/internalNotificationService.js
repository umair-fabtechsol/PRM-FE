// services/internalNotificationService.js
const Notification = require("../models/Notification");

async function createPlatformNotification({
  userId,
  type,
  title,
  message,
  metadata = {},
}) {
  try {
    const notification = new Notification({
      user: userId,
      type,
      title,
      message,
      metadata,
      status: "unread",
    });

    await notification.save();

    // Here you would also emit a socket.io event for real-time notifications
    // require('../socket').emitNotification(userId, notification);

    return notification;
  } catch (error) {
    console.error("Error creating platform notification:", error);
    throw error;
  }
}

module.exports = { createPlatformNotification };
