import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, { timestamps: true });


const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This links the post to a User
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL from Cloudinary
        default: "",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Array of users who liked the post
    }],
    comments: [commentSchema] // Array of comment objects
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;