# 🚀 Yojak Blog Application (React + Appwrite)

A modern, full-stack blog platform built with **React** and **Appwrite**, enabling users to create, manage, and explore content with a seamless and responsive experience.

---

## ✨ Features

- 🔐 Secure Authentication (Login / Signup)
- 📝 Create, Edit & Delete Posts (CRUD)
- 🖼️ Image Upload via Appwrite Storage
- 🧠 Rich Text Editor for content creation
- 🔍 Dynamic Routing with React Router
- 🛡️ Protected Routes (Author-only access)
- 📱 Fully Responsive UI (Mobile + Desktop)
- ⚡ Fast, scalable architecture

---

## 🛠️ Tech Stack

| Category       | Technology                 |
| -------------- | -------------------------- |
| Frontend       | React, Redux Toolkit       |
| Routing        | React Router DOM           |
| Backend (BaaS) | Appwrite                   |
| Styling        | Tailwind CSS               |
| Editor         | TinyMCE / Rich Text Editor |
| State Mgmt     | Redux                      |

---

## 📂 Project Structure

src/
├── appwrite/ # Appwrite services & config
├── components/ # Reusable UI components
├── pages/ # Pages (Home, Post, Auth)
├── store/ # Redux store
├── utils/ # Helper functions
├── App.jsx
└── main.jsx

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/blog-app.git

cd blog-app

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Environment Setup

Create a `.env` file in the root:

VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

### 4️⃣ Run the App

npm run dev

---

## 🔑 Appwrite Configuration

Ensure the following are set up:

- ✅ Database & Collection (posts)
- ✅ Storage Bucket (images)
- ✅ Authentication enabled
- ✅ Required permissions/scopes configured

---

## 📸 Key Highlights

- 📌 Clean UI with modern design
- 📌 Author-based access control
- 📌 Image preview & fallback handling
- 📌 Optimized component structure
- 📌 Scalable backend using Appwrite

---

## 🚀 Future Enhancements

- 💬 Comments & discussions
- ❤️ Like / Bookmark system
- 🔍 Search & filters
- 🌙 Dark/Light mode
- 📊 Admin dashboard

---

## 👨‍💻 Author

**Pankaj Aher**

---
