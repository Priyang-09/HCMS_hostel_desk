import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ showAccount = false, showLogout = false }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccount = () => {
    if (user?.type === 'student') {
      navigate('/studentacc');
    } else if (user?.type === 'staff') {
      navigate('/staffacc');
    }
  };

  return (
    <nav className="bg-gray-200 px-12 py-4 w-full h-20 shadow-md">
      <div className="flex justify-between items-center">
        <a href="#" className="text-2xl font-semibold">
          Hostel Complaint Management System
        </a>
        {(showAccount || showLogout) && (
          <div className="flex gap-4">
            {showAccount && (
              <button
                onClick={handleAccount}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600"
              >
                Account
              </button>
            )}
            {showLogout && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

