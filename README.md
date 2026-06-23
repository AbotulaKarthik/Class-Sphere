# 🎓 ClassSphere - Smart Classroom Management System

<div align="center">

<h3>A Full Stack Learning Management System for Students and Faculty</h3>

<p>
A modern MERN-based classroom platform that streamlines assignment management, student evaluation, and academic collaboration.
</p>

<br>

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge\&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge\&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css)

<br>

### 🌐 Live Demo

https://class-sphere-lyart.vercel.app/

### ⚡ Backend API

https://class-sphere.onrender.com/

</div>

---

# 📖 Overview

ClassSphere is a full-stack Learning Management System (LMS) built using the MERN stack. It bridges the gap between students and faculty by providing a centralized platform for managing classes, assignments, submissions, and evaluations.

Faculty members can create classes, upload assignments, evaluate submissions, and award marks, while students can join classes, submit assignments, and track their academic performance. The platform uses JWT-based authentication with secure HTTP-only cookies and role-based access control.

---

# ✨ Features

## 👨‍🏫 Faculty Module

* Secure Faculty Login
* Create Multiple Classes
* Generate and Share Class Codes
* View Join Requests
* Approve Students
* Create Assignments
* Upload Assignment PDFs
* View Student Submissions
* Evaluate Assignments
* Assign Marks Manually
* Track Evaluated Students

---

## 👨‍🎓 Student Module

* Student Registration & Login
* Join Classes Using Class Code
* View Available Assignments
* Assignment Details Page
* Upload Assignment Solutions
* View Submitted Assignments
* Check Awarded Marks
* Persistent Authentication
* Role-Based Access

---

## 🔐 Authentication & Security

* JWT Authentication
* HTTP-only Cookies
* Secure Cross-Origin Cookies
* Protected Routes
* Role-Based Middleware
* Password Hashing using bcrypt
* Session Persistence

---

# 🚀 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Context API

## Backend

* Node.js
* Express.js
* JWT
* Cookie Parser
* Multer
* CORS

## Database

* MongoDB Atlas
* Mongoose ODM

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

# 🏗 System Architecture

```text
                ┌───────────────┐
                │ React Frontend│
                │   (Vercel)    │
                └───────┬───────┘
                        │
                  Axios Requests
                        │
                        ▼
               ┌────────────────┐
               │ Express Backend│
               │    (Render)    │
               └───────┬────────┘
                       │
                JWT + Cookies
                       │
                       ▼
               ┌────────────────┐
               │ MongoDB Atlas  │
               └────────────────┘
```

---

# 📂 Project Structure

```text
ClassSphere
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🗄 Database Schema

## User

```javascript
{
  name,
  email,
  regno,
  password,
  role
}
```

## Class

```javascript
{
  classId,
  className,
  faculty
}
```

## Join Request

```javascript
{
  student,
  classId,
  status
}
```

## Assignment

```javascript
{
  title,
  description,
  dueDate,
  maxMarks,
  classId,
  questionFile
}
```

## Submission

```javascript
{
  assignmentId,
  student,
  answerFile,
  marks,
  evaluated
}
```

---

# 📌 REST APIs

## Student APIs

* Register
* Login
* Logout
* Authentication

## Faculty APIs

* Faculty Login
* Faculty Authentication

## Class APIs

* Create Class
* Fetch Classes
* Student Classes

## Join Request APIs

* Request To Join Class
* View Requests
* Approve Requests

## Assignment APIs

* Create Assignment
* Get Assignment
* Submit Assignment
* View Submissions
* Evaluate Submission

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/AbotulaKarthik/Class-Sphere.git
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
MONGODB_URI=
JWT_SECRET=
FACULTY_EMAIL=
FACULTY_PASSWORD=
NODE_ENV=production
```

## Frontend (.env)

```env
VITE_BACKEND_URL=
```

---

# ▶ Running Locally

## Backend

```bash
npm run server
```

## Frontend

```bash
npm run dev
```

---

# 🌐 Deployment

## Frontend

Hosted on Vercel

https://class-sphere-lyart.vercel.app/

## Backend

Hosted on Render

https://class-sphere.onrender.com/

## Database

MongoDB Atlas

---

# 🔒 Security Features

✅ JWT Authentication

✅ HTTP-only Cookies

✅ Role-Based Access Control

✅ Password Encryption using bcrypt

✅ Session Persistence

✅ Protected Routes

✅ Cross-Origin Secure Cookies

---

# 🎯 Future Enhancements

* Cloudinary Integration
* Attendance Management
* Email Notifications
* Password Reset
* AI-based Assignment Evaluation
* Real-time Notifications
* Analytics Dashboard
* Discussion Forums
* Mobile Application
* Dark Mode Support

---

# 💡 Key Highlights

* Full Stack MERN Application
* Role-Based Authentication
* Persistent Sessions
* RESTful API Architecture
* Secure Cookie Authentication
* Assignment Workflow Management
* Student Evaluation System
* Responsive UI
* Production Deployment on Vercel + Render

---

# 👨‍💻 Author

## Karthik Abotula

B.Tech Computer Science Engineering

Passionate about Full Stack Development, Backend Engineering, Cloud Computing and Building Scalable Applications.

### GitHub

https://github.com/AbotulaKarthik

---

<div align="center">

### ⭐ If you found this project interesting, please consider giving it a star!

## Built with ❤️ using the MERN Stack

</div>
