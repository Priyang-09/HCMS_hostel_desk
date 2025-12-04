import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Alert from '../common/Alert';
import userIcon from '../../assets/images/user-icon.svg';
import passwordIcon from '../../assets/images/password-icon.svg';

const StaffLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login('staff', formData);
    if (result.success) {
      navigate('/checkcomplaint');
    } else {
      setAlert({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="rounded-full border border-primary px-4 py-1 text-sm font-semibold text-primary hover:bg-orange-50"
          >
            Back
          </button>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Staff Portal
          </p>
        </div>
        <p className="text-center pb-4 text-2xl font-semibold text-gray-900">Staff Login</p>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <img
                src={userIcon}
                alt="User Icon"
                className="h-5 w-auto"
              />
            </span>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Enter your ID"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <img
                src={passwordIcon}
                alt="Password Icon"
                className="h-5 w-auto"
              />
            </span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:-translate-y-0.5 hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signupstaff" className="font-semibold text-secondary underline-offset-2 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;

