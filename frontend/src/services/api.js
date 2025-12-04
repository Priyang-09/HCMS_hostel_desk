import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  studentLogin: (data) => api.post('/auth/student/login', data),
  staffLogin: (data) => api.post('/auth/staff/login', data),
  studentSignup: (data) => api.post('/auth/student/signup', data),
  staffSignup: (data) => api.post('/auth/staff/signup', data),
};

export const studentAPI = {
  getProfile: () => api.get('/student/profile'),
  updateProfile: (data) => api.put('/student/profile', data),
  changePassword: (data) => api.post('/student/change-password', data),
  deleteAccount: () => api.delete('/student/account'),
  getComplaints: () => api.get('/complaint/student'),
  submitComplaint: (data) => api.post('/complaint/student', data),
  filterComplaints: (data) => api.post('/complaint/student/filter', data),
  deleteComplaint: (id) => api.put(`/complaint/student/${id}/delete`),
  approveComplaint: (id) => api.put(`/complaint/student/${id}/approve`),
  reraiseComplaint: (id) => api.put(`/complaint/student/${id}/reraise`),
};

export const staffAPI = {
  getProfile: () => api.get('/staff/profile'),
  updateProfile: (data) => api.put('/staff/profile', data),
  changePassword: (data) => api.post('/staff/change-password', data),
  deleteAccount: () => api.delete('/staff/account'),
  getComplaints: () => api.get('/complaint/staff'),
  filterComplaints: (data) => api.post('/complaint/staff/filter', data),
  resolveComplaint: (id) => api.put(`/complaint/staff/${id}/resolve`),
  deleteComplaint: (id) => api.put(`/complaint/staff/${id}/delete`),
};

export const commonAPI = {
  getCategories: () => api.get('/categories'),
  getHostels: () => api.get('/hostels'),
};

export default api;

