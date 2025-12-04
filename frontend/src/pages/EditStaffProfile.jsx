import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { staffAPI } from '../services/api';
import Alert from '../components/common/Alert';

const EditStaffProfile = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await staffAPI.getProfile();
      setStaff(response.data);
      setFormData({
        name: response.data.full_name,
        email: response.data.email,
        contact: response.data.phone,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await staffAPI.updateProfile(formData);
      setAlert({ message: 'Profile updated successfully', type: 'success' });
      setTimeout(() => navigate('/staffacc'), 1000);
    } catch (error) {
      setAlert({ message: 'Error updating profile', type: 'error' });
    }
  };

  if (!staff) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Navbar showLogout />
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Contact:</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStaffProfile;

