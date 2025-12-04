import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { staffAPI } from '../services/api';
import Alert from '../components/common/Alert';

const StaffProfile = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '', confirm_password: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await staffAPI.getProfile();
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Do you really want to delete your account?')) {
      try {
        await staffAPI.deleteAccount();
        navigate('/');
      } catch (error) {
        setAlert({ message: error.response?.data?.message || 'Error deleting account', type: 'error' });
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await staffAPI.changePassword(passwordData);
      setAlert({ message: response.data.message, type: 'success' });
      setShowPasswordForm(false);
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
      setTimeout(() => {
        navigate('/login_staff');
      }, 2000);
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Error changing password', type: 'error' });
    }
  };

  if (!staff) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Navbar showLogout />
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="text-left mt-12 ml-16">
        <p className="text-xl font-medium mt-5">Profile</p>
      </div>

      <div className="w-[500px] p-2 m-5 ml-16 border border-gray-300 rounded shadow bg-white">
        <div className="flex justify-between mb-2 pb-2 border-b">
          <span>Name:</span>
          <span>{staff.full_name}</span>
        </div>
        <div className="flex justify-between mb-2 pb-2 border-b">
          <span>Email:</span>
          <span>{staff.email}</span>
        </div>
        <div className="flex justify-between mb-2 pb-2 border-b">
          <span>Contact Number:</span>
          <span>{staff.phone}</span>
        </div>
        <div className="flex justify-between mb-2 pb-2">
          <span>Category:</span>
          <span>{staff.category?.category_name}</span>
        </div>
      </div>

      <div className="ml-16">
        <button
          onClick={() => navigate('/editstaff')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600"
        >
          Edit Profile
        </button>
        <button
          onClick={handleDeleteAccount}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Account
        </button>
        <button
          onClick={() => setShowPasswordForm(true)}
          className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-orange-600"
        >
          Change Password
        </button>
      </div>

      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-4/5 max-w-2xl p-5 rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p>Change Password :</p>
              <button onClick={() => setShowPasswordForm(false)} className="text-2xl">&times;</button>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="flex justify-between items-center h-8">
                <span>Old Password :</span>
                <input
                  type="password"
                  value={passwordData.old_password}
                  onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                  className="w-64 border rounded px-2"
                  required
                />
              </div>
              <div className="flex justify-between items-center h-8">
                <span>New Password :</span>
                <input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="w-64 border rounded px-2"
                  required
                />
              </div>
              <div className="flex justify-between items-center h-8">
                <span>Confirm Password :</span>
                <input
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                  className="w-64 border rounded px-2"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffProfile;

