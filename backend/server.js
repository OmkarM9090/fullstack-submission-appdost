import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// CORS setup to allow credentials (cookies) from your frontend
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// To parse JSON payloads from requests
app.use(express.json({ limit: "5mb" })); // Limit for Cloudinary base64 uploads
// To parse form data (though we mainly use JSON)
app.use(express.urlencoded({ extended: true })); 
// To parse cookies
app.use(cookieParser());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

// --- Server & DB Connection ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToMongoDB();
});