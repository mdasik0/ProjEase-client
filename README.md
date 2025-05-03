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

├── public/               # Static files like index.html, icons, etc.
├── src/
│   ├── assets/           # Images, icons, and other static assets
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── redux/            # Redux store, slices, and API integrations
│   ├── routes/           # Route definitions and layout wrappers
│   ├── socket/           # Socket.io setup and listeners
│   ├── styles/           # Global styles and Tailwind configs
│   └── utils/            # Utility functions
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── README.md             # Project overview and documentation

## 📄 License

This project is licensed under the MIT License.

### Installation

```bash
git clone https://github.com/yourusername/projease-frontend.git
cd projease-frontend
npm install

