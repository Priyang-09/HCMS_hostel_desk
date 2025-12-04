# Hostel Complaint Management System - MERN Stack

A full-stack web application for managing hostel complaints, built with MongoDB, Express.js, React, and Node.js. **NO Python files or dependencies.**

## Technology Stack

- **Backend**: Node.js + Express.js (JavaScript)
- **Frontend**: React.js + Tailwind CSS (JavaScript/JSX)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Features

- Student and Staff authentication
- Complaint submission and tracking
- Automated staff assignment based on category
- Filter complaints by date, category, and status
- Profile management
- Password change functionality
- Account deletion with validation

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd hcms-mern/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hcms
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd hcms-mern/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:3000`

## Database Setup

1. Make sure MongoDB is running
2. The application will automatically create the database and collections on first run
3. You may need to seed initial data (categories and hostels) manually

## API Endpoints

### Authentication
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/staff/login` - Staff login
- `POST /api/auth/student/signup` - Student registration
- `POST /api/auth/staff/signup` - Staff registration

### Student
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile
- `POST /api/student/change-password` - Change password
- `DELETE /api/student/account` - Delete account
- `GET /api/complaint/student` - Get complaints
- `POST /api/complaint/student` - Submit complaint
- `POST /api/complaint/student/filter` - Filter complaints

### Staff
- `GET /api/staff/profile` - Get profile
- `PUT /api/staff/profile` - Update profile
- `POST /api/staff/change-password` - Change password
- `DELETE /api/staff/account` - Delete account
- `GET /api/complaint/staff` - Get assigned complaints
- `PUT /api/complaint/staff/:id/resolve` - Resolve complaint
- `POST /api/complaint/staff/filter` - Filter complaints

### Common
- `GET /api/categories` - Get all categories
- `GET /api/hostels` - Get all hostels

## Project Structure

```
hcms-mern/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── utils/
    └── package.json
```

## Notes

- All code is JavaScript/TypeScript - NO Python files
- Uses Tailwind CSS for styling (NO Bootstrap)
- JWT tokens stored in localStorage
- Password hashing should be implemented with bcrypt in production

