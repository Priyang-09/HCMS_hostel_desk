import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { studentAPI, commonAPI } from '../services/api';
import Alert from '../components/common/Alert';
import guaranteedResolutionIcon from '../assets/images/guaranteed-resolution-icon.svg';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: '', complaint: '' });
  const [filterData, setFilterData] = useState({
    datepicker: '',
    category: 'None',
    status: 'None',
    approvalStatus: 'None',
  });
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchComplaints();
    fetchCategories();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await studentAPI.getProfile();
      setName(response.data.full_name);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await studentAPI.getComplaints();
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await commonAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.submitComplaint(formData);
      setAlert({ message: 'Complaint submitted successfully', type: 'success' });
      setFormData({ category: '', complaint: '' });
      setShowForm(false);
      fetchComplaints();
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Error submitting complaint', type: 'error' });
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await studentAPI.filterComplaints(filterData);
      setComplaints(response.data);
      setShowFilter(false);
    } catch (error) {
      setAlert({ message: 'Error filtering complaints', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentAPI.deleteComplaint(id);
      fetchComplaints();
    } catch (error) {
      setAlert({ message: 'Error deleting complaint', type: 'error' });
    }
  };

  const handleApprove = async (id) => {
    try {
      await studentAPI.approveComplaint(id);
      setAlert({ message: 'Complaint approved successfully', type: 'success' });
      fetchComplaints();
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Error approving complaint', type: 'error' });
    }
  };

  const handleReraise = async (id) => {
    try {
      await studentAPI.reraiseComplaint(id);
      setAlert({ message: 'Complaint re-raised successfully', type: 'success' });
      fetchComplaints();
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Error re-raising complaint', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 pb-16">
      <Navbar showAccount showLogout />
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="mx-auto w-full max-w-6xl px-4 pt-8">
        <div className="flex flex-col items-start justify-between gap-4 pb-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Student portal</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">Welcome {name}</p>
            <p className="mt-1 text-sm text-gray-600">View the status of your hostel complaints and submit new ones.</p>
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-red-600"
          >
            Filter complaints
          </button>
        </div>

        {showFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-4/5 max-w-2xl p-5 rounded shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <p>Select Filters :</p>
                <button onClick={() => setShowFilter(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleFilter} className="space-y-4">
                <div>
                  <span>Date :</span>
                  <input
                    type="date"
                    name="datepicker"
                    value={filterData.datepicker}
                    onChange={(e) => setFilterData({ ...filterData, datepicker: e.target.value })}
                    className="ml-12 h-6 w-72 border rounded px-2"
                  />
                </div>
                <div>
                  <span>Category :</span>
                  <select
                    name="category"
                    value={filterData.category}
                    onChange={(e) => setFilterData({ ...filterData, category: e.target.value })}
                    className="ml-4 w-72 h-8 border rounded px-2"
                  >
                    <option value="None"></option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span>Status :</span>
                  <select
                    name="status"
                    value={filterData.status}
                    onChange={(e) => setFilterData({ ...filterData, status: e.target.value })}
                    className="ml-12 w-72 h-8 border rounded px-2"
                  >
                    <option value="None"></option>
                    <option value="0">Pending</option>
                    <option value="1">Completed</option>
                  </select>
                </div>
                <div>
                  <span>Approval Status :</span>
                  <select
                    name="approvalStatus"
                    value={filterData.approvalStatus}
                    onChange={(e) => setFilterData({ ...filterData, approvalStatus: e.target.value })}
                    className="ml-2 w-72 h-8 border rounded px-2"
                  >
                    <option value="None"></option>
                    <option value="pending">Pending (with staff)</option>
                    <option value="waiting_approval">Waiting for your approval</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterData({
                        datepicker: '',
                        category: 'None',
                        status: 'None',
                        approvalStatus: 'None',
                      });
                      fetchComplaints();
                      setShowFilter(false);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Clear all filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {complaints.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-white/70 px-6 py-10 text-center text-sm text-gray-500">
            No complaints registered yet. Use the form below to submit your first grievance.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complaints
              .filter((c) => c.delete_by_student === 0)
              .map((complaint) => (
                <div
                  key={complaint._id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {complaint.category?.category_name}
                  </h3>
                  <h4 className="mt-1 text-xs font-medium text-gray-600">
                    Created: {new Date(complaint.created_at).toLocaleString()}
                  </h4>
                  {complaint.resolved_at && (
                    <h4 className="text-xs font-medium text-gray-600">
                      Resolved: {new Date(complaint.resolved_at).toLocaleString()}
                    </h4>
                  )}
                  <h4 className="text-xs font-medium text-gray-600">
                    Assigned to: {complaint.staff?.full_name} (Contact No. {complaint.staff?.phone})
                  </h4>
                  <p className="mt-2 text-xs text-gray-700">{complaint.description}</p>
                  {complaint.workflow_status === 'waiting_approval' ? (
                    <div className="mt-3">
                      <p className="mb-1 text-xs font-medium text-yellow-700">Waiting for your approval</p>
                      <button
                        onClick={() => handleApprove(complaint._id)}
                        className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReraise(complaint._id)}
                        className="ml-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-600"
                      >
                        Raise Again
                      </button>
                    </div>
                  ) : complaint.status ? (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                        Completed
                      </span>
                      <button
                        onClick={() => handleDelete(complaint._id)}
                        className="ml-auto rounded-full bg-blue-500 px-3 py-1 text-[11px] font-semibold text-white hover:bg-blue-600"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                        {complaint.workflow_status === 'pending' ? 'In Progress' : 'Not Completed'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        <div className="mt-12 flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <h4 className="mb-3 text-left text-lg font-semibold text-gray-900">Submit Your Grievance</h4>
            <div className="text-left text-sm text-gray-700">
              <p>
              We address hostel complaints quickly and confidentially to help maintain a comfortable and safe place for every resident.
              </p>
              <p className="mt-4 flex items-center text-red-600">
                <img
                  src={guaranteedResolutionIcon}
                  alt="Guaranteed Resolution Icon"
                  className="w-12 h-12 mr-2 float-left"
                />
                Guaranteed Resolution
              </p>
              <p className="ml-14 -mt-2">
              Guaranteed Resolution ensures that all student grievances receive timely attention and are effectively resolved with assured outcomes.
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 text-left shadow-lg shadow-orange-100">
              <p className="mt-1 text-2xl font-semibold text-gray-900">Submit Complaint</p>
              <p className="mt-1 text-sm text-gray-600">Contact us for hostel grievance redressal</p>
              <hr className="my-4 border-gray-200" />
              <form onSubmit={handleSubmitComplaint}>
                <label className="mb-2 block text-sm font-semibold text-gray-800">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mb-4 w-full rounded-2xl border border-gray-300 p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                >
                  <option value="" disabled>Select complaint category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
                <label className="mb-2 block text-sm font-semibold text-gray-800">Tell us about your grievance</label>
                <textarea
                  value={formData.complaint}
                  onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                  rows="4"
                  className="mb-4 w-full rounded-2xl border border-gray-300 p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="mt-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-orange-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

