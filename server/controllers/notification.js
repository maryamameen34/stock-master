const Notification = require("../models/notification");
const User = require("../models/user.js");

exports.fetchAdminNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({ admin_message: { $exists: true, $ne: null } })
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.UserNotification = async (req, res) => {
  const userId = req.params.userId;  
  console.log("Received userId:", userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.readNotification = async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, { read: true });
  res.sendStatus(200);
};
