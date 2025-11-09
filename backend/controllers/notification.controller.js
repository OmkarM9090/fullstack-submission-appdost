import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({ to: userId })
            .populate("from", "_id fullName profilePic headline") // Get sender's info
            .sort({ createdAt: -1 }); // Show newest first

        res.status(200).json(notifications);

    } catch (error) {
        console.log("Error in getNotifications controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const markNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user._id;

        // Update all notifications for this user to be 'read: true'
        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json({ message: "Notifications marked as read" });

    } catch (error)
 {
        console.log("Error in markNotificationsAsRead controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};