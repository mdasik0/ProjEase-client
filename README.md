<img src="https://i.ibb.co.com/6cMzRsHm/MINI-LOGO-FOR-WHITE-BG.png" alt="ProjEase Logo" width="50" height="50" />

# ProjEase — Frontend

**Simplify teamwork. Power up your projects.**

ProjEase is a collaborative project management platform designed to help teams manage tasks, chat in real-time, and stay organized — all in one place. This repository contains the frontend code for the ProjEase platform, built with **React**, **Redux Toolkit**, and **Tailwind CSS**.

## 🌐 Live Site

[https://proj-ease.vercel.app](https://proj-ease.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** with Firebase (Email/Password + Google Login)
- 🧠 **Multi-step Sign-up Flow** with real-time form validation
- 🗂️ **Task Management** system for every project
- 💬 **Real-time Group Chat** using Socket.IO
- 📷 **Profile Image Uploads** using Imgbb
- 🖼️ **Dynamic UI** with Tailwind CSS
- 🔁 **State Management** using Redux Toolkit
- ✅ **Responsive Design** for all screen sizes

---

## 📦 Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **API Integration**: RTK Query
- **Authentication**: Firebase Auth
- **Real-time Communication**: Socket.IO
- **Image Hosting**: Imgbb
- **Toast Notifications**: React Hot Toast

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Firebase project setup
- Backend API running (from [Projease Backend Repo](#))
  
## 📁 Folder Structure

proj-ease-frontend/
├── public/               # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/           # Images and static resources
│   ├── components/       # Reusable components
│   ├── pages/            # Page components (like Login, Dashboard)
│   ├── redux/            # Redux Toolkit slices and API services
│   ├── routes/           # Route configurations
│   ├── socket/           # Socket.io setup and listeners
│   ├── styles/           # Tailwind/global styles
│   └── utils/            # Utility functions
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind config
├── vite.config.js        # Vite config
└── README.md             # Project documentation

## 📄 License

This project is licensed under the MIT License.

### Installation

```bash
git clone https://github.com/yourusername/projease-frontend.git
cd projease-frontend
npm install

