# Student Idea Management System

A React + Vite web application for managing student project ideas with role-based access.

## Features

- **Authentication**: Email/Password login with role selection (Student/HR)
- **Student Dashboard**: Submit project ideas with detailed information
- **HR Dashboard**: View all submitted ideas in table format
- **Secure**: Password hashing with bcrypt

## Tech Stack

- **Frontend**: React + Vite, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: bcrypt

## Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)

### 2. Start MongoDB
```bash
# Windows (if MongoDB installed as service)
net start MongoDB

# Or start manually
mongod
```

### 3. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on: `http://localhost:5000`

### 4. Frontend Setup
```bash
cd idea-app
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

## Project Structure

```
student-idea-management/
├── idea-app/                 # React frontend (like ecom-app)
│   ├── src/
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── RegisterIdea.jsx
│   │   ├── HRDashboard.jsx
│   │   ├── Navbar.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── backend/                  # Node.js backend
│   ├── server.js
│   └── package.json
├── database.sql
└── package.json
```

## Usage

### For Students:
1. Register with "Student" role
2. Login to access dashboard
3. Click "Register Idea" to submit proposals

### For HR:
1. Register with "HR" role  
2. Login to view all submitted ideas
3. Ideas are read-only for HR users