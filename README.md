AppDost Connect - Full Stack Internship Submission

This is a full-stack MERN project, "AppDost Connect," built as a technical assignment for the AppDost Full Stack Developer Internship.

The application is a modern, clean, and feature-rich social media platform inspired by LinkedIn, designed to demonstrate proficiency in both frontend and backend development.

Submitted by: Omkar Mahadik
Email: omkarmahadik180@gmail.com
LinkedIn Profile:[https://www.linkedin.com/in/omkar-mahadik-976532283/](https://www.linkedin.com/in/omkar-mahadik-976532283/)

🚀 Live Demo Links

Live Frontend (Vercel): [https://fullstack-submission-appdost.vercel.app](https://fullstack-submission-appdost.vercel.app)

Live Backend (Render): [https://fullstack-submission-appdost.onrender.com](https://fullstack-submission-appdost.onrender.com)

📸 Project Demo

Here is a short demo of the application in action, showing the main feed, dark mode, post interactions, and the profile page.

(Instructions: Replace the link below with the URL of your own screenshot or GIF. See the steps above.)

✨ Features

This project fulfills all core requirements from the assignment, as well as all optional bonus features and several "wow" features to demonstrate advanced skills.

Core Requirements (Assignment)

Full User Authentication: Secure signup, login, and logout (using JWT & cookies).

Create Posts: Logged-in users can create new posts with text.

Public Feed: All users can see a public feed, sorted with the latest posts first.

User Identity: The user's name is displayed on the navbar.

🏆 Bonus & "Wow" Features (Above & Beyond)

Modern UI/UX: Clean, responsive, and aesthetic design with full Dark Mode support.

Post Image Uploads: Users can upload images with their posts, hosted on Cloudinary.

Full Post CRUD: Users can Edit and Delete their own posts.

Post Interactions: Users can Like and Unlike posts.

Advanced Comment System:

Users can comment on posts.

Users can Edit and Delete their own comments.

Users can Like and Unlike other comments.

Comment Suggestions: Quick-reply buttons (e.g., "Congratulations!") appear under posts.

Full Profile Page:

Users can view their own profile, which includes a "Back" button and "Edit" toggle.

Users can view other users' profiles by clicking their names.

Profile Editing: Users can update their Full Name, Headline, and a detailed Bio/Description.

Profile Picture: Users can upload a new profile picture or Remove their existing one.

Notification System:

Users receive notifications when others like a post, comment on a post, or like a comment.

An unread notification dot appears on a bell icon in the navbar.

Notifications are marked as "read" when the dropdown is viewed.

🛠️ Tech Stack

This project was built using the MERN stack as specified in Option 1 of the assignment.

Frontend

Backend

⚙️ Getting Started & How to Run Locally

To run this project on your local machine, please follow these steps.

Prerequisites

Node.js (v18 or later)

npm

A MongoDB Atlas account (for MONGO_URI)

A Cloudinary account (for image upload keys)

1. Clone the Repository

git clone [https://github.com/OmkarM9090/fullstack-submission-appdost.git](https://github.com/OmkarM9090/fullstack-submission-appdost.git)
cd fullstack-submission-appdost


2. Backend Setup

# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file
# (Copy the contents from .env.example)
touch .env

# 4. Add your secret keys to the .env file
# (See backend/.env.example for all required variables)
# You must provide your MONGO_URI, JWT_SECRET, and Cloudinary keys.

# 5. Run the server
npm run dev
# Server will be running on http://localhost:5001


3. Frontend Setup

# 1. Navigate to the frontend folder (from the root)
cd frontend/my-app

# 2. Install dependencies
npm install

# 3. Create a .env file
# (Copy the contents from .env.example)
touch .env

# 4. Add the backend API URL to the .env file
# The file should contain:
# VITE_API_URL=http://localhost:5001

# 5. Run the app
npm run dev
# App will be running on http://localhost:5173
