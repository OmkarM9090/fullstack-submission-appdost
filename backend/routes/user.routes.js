import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  updateUserProfile,
  getUserProfile,
  followUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// This single route handles all profile updates
router.put("/update", protectRoute, updateUserProfile);

// Route to fetch user profile by ID
router.get("/:id", getUserProfile);

// Route to follow/unfollow a user
router.put("/:id/follow", protectRoute, followUser);

export default router;