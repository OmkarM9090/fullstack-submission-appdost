import express from "express";
import protectRoute from "../middleware/protectRoute.js";

// Make sure all these functions are imported
import { 
    createPost, 
    getAllPosts, 
    likeUnlikePost, 
    commentOnPost,
    deletePost,
    updatePost,
    deleteComment,
    updateComment,
    likeUnlikeComment
} from "../controllers/post.controller.js";

const router = express.Router();

// --- Post Routes ---
router.get("/all", getAllPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.delete("/:id", protectRoute, deletePost);
router.put("/:id", protectRoute, updatePost); 

// --- Comment Routes (You are missing these) ---
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/comment/:postId/:commentId", protectRoute, deleteComment);
router.put("/comment/:postId/:commentId", protectRoute, updateComment);
router.post("/comment/like/:postId/:commentId", protectRoute, likeUnlikeComment);

export default router;