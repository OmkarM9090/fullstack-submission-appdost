import User from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        // Get all possible fields from the body
        const { fullName, headline, description, profilePic } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // --- UPDATED IMAGE LOGIC ---
        let profilePicUrl = user.profilePic; // Default to existing pic

        if (profilePic) {
            // Case 1: New image (base64 string) is provided
            profilePicUrl = await uploadToCloudinary(profilePic, "linkedin-profiles");
        } else if (profilePic === "") {
            // Case 2: Empty string is sent, meaning "Remove photo"
            // TODO: Add logic here to delete the old image from Cloudinary if it exists
            profilePicUrl = "";
        }
        // Case 3: profilePic is null/undefined (not sent), so we do nothing and keep the old one.

        // Update fields
        user.fullName = fullName ?? user.fullName;
        user.headline = headline ?? user.headline;
        user.description = description ?? user.description; // Add description
        user.profilePic = profilePicUrl; // Update pic URL

        await user.save();

        // Send back the updated user (minus password)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            headline: user.headline,
            description: user.description, // Send new field back
        });

    } catch (error) {
        console.log("Error in updateUserProfile controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Follow or unfollow a user
// @route   PUT /api/users/:id/follow
// @access  Private
export const followUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const targetUserId = req.params.id;

        if (userId === targetUserId) {
            return res.status(400).json({ error: "You cannot follow yourself." });
        }

        const targetUser = await User.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({ error: "User not found." });
        }

        const isFollowing = targetUser.followers.includes(userId);

        if (isFollowing) {
            // Unfollow the user
            targetUser.followers.pull(userId);
            await targetUser.save();

            const currentUser = await User.findById(userId);
            currentUser.following.pull(targetUserId);
            await currentUser.save();

            return res.status(200).json({ message: "Unfollowed the user." });
        } else {
            // Follow the user
            targetUser.followers.push(userId);
            await targetUser.save();

            const currentUser = await User.findById(userId);
            currentUser.following.push(targetUserId);
            await currentUser.save();

            return res.status(200).json({ message: "Followed the user." });
        }
    } catch (error) {
        console.log("Error in followUser controller: ", error.message);
        console.log("Target User:", targetUser);
        console.log("Current User:", currentUser);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password").populate({
            path: "posts",
            options: { sort: { createdAt: -1 } },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Send a follow request
// @route   POST /api/users/:id/follow-request
// @access  Private
export const sendFollowRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        if (senderId === receiverId) {
            return res.status(400).json({ error: "You cannot send a follow request to yourself." });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if a follow request already exists
        const existingRequest = receiver.notifications.find(
            (notification) => notification.sender.toString() === senderId.toString() && notification.type === "follow_request"
        );

        if (existingRequest) {
            return res.status(400).json({ error: "Follow request already sent." });
        }

        // Add follow request to receiver's notifications
        receiver.notifications.push({ sender: senderId, type: "follow_request" });
        await receiver.save();

        res.status(200).json({ message: "Follow request sent successfully." });
    } catch (error) {
        console.log("Error in sendFollowRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Accept a follow request
// @route   PUT /api/users/:id/accept-follow-request
// @access  Private
export const acceptFollowRequest = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const senderId = req.params.id;

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "User not found." });
        }

        // Find the follow request
        const requestIndex = receiver.notifications.findIndex(
            (notification) => notification.sender.toString() === senderId.toString() && notification.type === "follow_request"
        );

        if (requestIndex === -1) {
            return res.status(404).json({ error: "Follow request not found." });
        }

        // Update the request status
        receiver.notifications[requestIndex].status = "accepted";
        receiver.followers.push(senderId);
        await receiver.save();

        const sender = await User.findById(senderId);
        sender.following.push(receiverId);
        await sender.save();

        res.status(200).json({ message: "Follow request accepted." });
    } catch (error) {
        console.log("Error in acceptFollowRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Reject a follow request
// @route   PUT /api/users/:id/reject-follow-request
// @access  Private
export const rejectFollowRequest = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const senderId = req.params.id;

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "User not found." });
        }

        // Find the follow request
        const requestIndex = receiver.notifications.findIndex(
            (notification) => notification.sender.toString() === senderId.toString() && notification.type === "follow_request"
        );

        if (requestIndex === -1) {
            return res.status(404).json({ error: "Follow request not found." });
        }

        // Update the request status
        receiver.notifications[requestIndex].status = "rejected";
        await receiver.save();

        res.status(200).json({ message: "Follow request rejected." });
    } catch (error) {
        console.log("Error in rejectFollowRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};