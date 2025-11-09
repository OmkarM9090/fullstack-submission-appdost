import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    profilePic: { 
        type: String, 
        default: "" 
    },
    headline: { 
        type: String, 
        default: "New User" 
    },
    // --- NEW FIELD ADDED ---
    description: {
        type: String,
        default: "",
        maxlength: 2000 // LinkedIn has a limit
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    notifications: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        type: {
            type: String,
            enum: ["follow_request"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);
export default User;