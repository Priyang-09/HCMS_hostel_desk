import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { studentAPI, commonAPI } from '../services/api';
import Alert from '../components/common/Alert';

const EditStudentProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', hostel: '', room: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchHostels();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await studentAPI.getProfile();
      setStudent(response.data);
      setFormData({
        name: response.data.full_name,
        email: response.data.email,
        contact: response.data.phone,
        hostel: response.data.hostel?._id || '',
        room: response.data.room_no,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchHostels = async () => {
    try {
      const response = await commonAPI.getHostels();
      setHostels(response.data);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.updateProfile(formData);
      setAlert({ message: 'Profile updated successfully', type: 'success' });
      setTimeout(() => navigate('/studentacc'), 1000);
    } catch (error) {
      setAlert({ message: 'Error updating profile', type: 'error' });
    }
  };

  if (!student) return <div>Loading...</div>;

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
          <div>
            <label className="block font-bold mb-2">Hostel:</label>
            <select
              value={formData.hostel}
              onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            >
              {hostels.map((hostel) => (
                <option key={hostel._id} value={hostel._id}>
                  {hostel.hostel_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Room:</label>
            <input
              type="number"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
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

export default EditStudentProfile;

