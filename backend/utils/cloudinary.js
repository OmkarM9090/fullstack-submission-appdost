import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary (this is already done in server.js, but good to have here)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// We are not using multer-storage-cloudinary, as we will upload from a base64 string
// This is simpler for the frontend.
// Instead, we just need a function to handle the upload.

export const uploadToCloudinary = async (fileString, folder) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(fileString, {
            folder: folder,
            resource_type: "image",
        });
        return secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
};

// This middleware is used to parse 'multipart/form-data' if you were uploading files directly
// But we are using base64 JSON, so we don't need it.
// const storage = multer.memoryStorage();
// export const upload = multer({ storage: storage });