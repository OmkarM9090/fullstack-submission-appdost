import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // Prevents XSS attacks (cookie cannot be accessed by JS)
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        sameSite: "strict", // Prevents CSRF attacks
        // secure: process.env.NODE_ENV === "production", // Uncomment this for production (HTTPS)
    });
};

export default generateTokenAndSetCookie;