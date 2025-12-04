import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import StudentLogin from './components/auth/StudentLogin';
import StaffLogin from './components/auth/StaffLogin';
import StudentSignup from './components/auth/StudentSignup';
import StaffSignup from './components/auth/StaffSignup';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import StudentProfile from './pages/StudentProfile';
import StaffProfile from './pages/StaffProfile';
import EditStudentProfile from './pages/EditStudentProfile';
import EditStaffProfile from './pages/EditStaffProfile';
import NavigationGuard from './components/common/NavigationGuard';

const PrivateRoute = ({ children, allowedType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedType && user.type !== allowedType) {
    return <Navigate to="/" replace />;
  }

  return <NavigationGuard>{children}</NavigationGuard>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/login_staff" element={<StaffLogin />} />
      <Route path="/signup" element={<StudentSignup />} />
      <Route path="/signupstaff" element={<StaffSignup />} />
      <Route
        path="/lodgecomplaint"
        element={
          <PrivateRoute allowedType="student">
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkcomplaint"
        element={
          <PrivateRoute allowedType="staff">
            <StaffDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/studentacc"
        element={
          <PrivateRoute allowedType="student">
            <StudentProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/staffacc"
        element={
          <PrivateRoute allowedType="staff">
            <StaffProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/editstudent"
        element={
          <PrivateRoute allowedType="student">
            <EditStudentProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/editstaff"
        element={
          <PrivateRoute allowedType="staff">
            <EditStaffProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

