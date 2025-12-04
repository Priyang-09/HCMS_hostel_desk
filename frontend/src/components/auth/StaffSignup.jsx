import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { commonAPI } from '../../services/api';
import Alert from '../common/Alert';

const StaffSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    id: '',
    full_name: '',
    email: '',
    phone: '',
    password: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await commonAPI.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup('staff', formData);
    if (result.success) {
      setAlert({ message: result.message, type: 'success' });
      setTimeout(() => navigate('/login_staff'), 2000);
    } else {
      setAlert({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-1">Staff Signup</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Register as staff to receive and resolve hostel complaints.
        </p>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Staff ID"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:-translate-y-0.5 hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login_staff" className="font-semibold text-secondary underline-offset-2 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default StaffSignup;

