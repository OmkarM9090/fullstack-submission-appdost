import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js"; // <-- 1. IMPORT NOTIFICATION MODEL
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Helper function to repopulate post data
const getRepopulatedPost = (postId) => {
    return Post.findById(postId)
        .populate("author", "_id fullName profilePic headline")
        .populate("comments.user", "_id fullName profilePic headline");
};

export const createPost = async (req, res) => {
    try {
        const { text, image } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Post text is required" });
        }

        const authorId = req.user._id;
        let imageUrl = "";

        if (image) {
            imageUrl = await uploadToCloudinary(image, "linkedin-posts");
        }

        const newPost = new Post({
            author: authorId,
            text: text,
            image: imageUrl,
        });

        await newPost.save();
        
        const post = await getRepopulatedPost(newPost._id);
        
        res.status(201).json(post);

    } catch (error) {
        console.log("Error in createPost controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("author", "_id fullName profilePic headline")
            .populate("comments.user", "_id fullName profilePic headline");

        res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getAllPosts controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
        } else {
            await Post.updateOne({ _id: postId }, { $push: { likes: userId } });

            // --- 2. ADD NOTIFICATION LOGIC ---
            // Only notify if it's not your own post
            if (post.author.toString() !== userId.toString()) {
                await Notification.create({
                    from: userId,
                    to: post.author,
                    type: 'like-post',
                    postId: post._id,
                });
            }
            // ---------------------------------
        }

        const updatedPost = await getRepopulatedPost(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log("Error in likeUnlikePost controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const newComment = {
            user: userId,
            text: text,
        };

        post.comments.push(newComment);
        await post.save();

        // --- 3. ADD NOTIFICATION LOGIC ---
        // Only notify if it's not your own post
        if (post.author.toString() !== userId.toString()) {
            await Notification.create({
                from: userId,
                to: post.author,
                type: 'comment-post',
                postId: post._id,
            });
        }
        // ---------------------------------

        const updatedPost = await getRepopulatedPost(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log("Error in commentOnPost controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized: You can only delete your own posts" });
        }
        
        // TODO: Delete image from Cloudinary if it exists
        // TODO: Delete associated notifications

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.log("Error in deletePost controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const { text } = req.body; 

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized: You can only edit your own posts" });
        }

        post.text = text;
        await post.save();
        
        const updatedPost = await getRepopulatedPost(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log("Error in updatePost controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        post.comments.pull(commentId);
        await post.save();

        // TODO: Delete associated notifications

        const updatedPost = await getRepopulatedPost(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log("Error in deleteComment controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        comment.text = text;
        await post.save();
        
        const updatedPost = await getRepopulatedPost(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log("Error in updateComment controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const likeUnlikeComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        const isLiked = comment.likes.includes(userId);
        if (isLiked) {
            comment.likes.pull(userId);
        } else {
            comment.likes.push(userId);
            
            // --- 4. ADD NOTIFICATION LOGIC ---
            // Only notify if it's not your own comment
            if (comment.user.toString() !== userId.toString()) {
                await Notification.create({
                    from: userId,
                    to: comment.user, // Notify the *comment author*
                    type: 'like-comment',
                    postId: post._id,
                });
            }
            // ---------------------------------
        }

        await post.save();
        const updatedPost = await getRepopulatedPost(postId);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log("Error in likeUnlikeComment controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};