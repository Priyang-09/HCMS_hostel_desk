import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { staffAPI, commonAPI } from '../services/api';
import Alert from '../components/common/Alert';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({
    datepicker: '',
    category: 'None',
    status: 'None',
    approvalStatus: 'None',
  });
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    fetchComplaints();
    fetchProfile();
    fetchCategories();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await staffAPI.getProfile();
      setName(response.data.full_name);
    } catch (error) {
      console.error('Error fetching profile:', error);
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

  const fetchComplaints = async () => {
    try {
      const response = await staffAPI.getComplaints();
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await staffAPI.filterComplaints(filterData);
      setComplaints(response.data);
      setShowFilter(false);
    } catch (error) {
      setAlert({ message: 'Error filtering complaints', type: 'error' });
    }
  };

  const handleResolve = async (id) => {
    try {
      await staffAPI.resolveComplaint(id);
      fetchComplaints();
    } catch (error) {
      setAlert({ message: 'Error resolving complaint', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await staffAPI.deleteComplaint(id);
      fetchComplaints();
    } catch (error) {
      setAlert({ message: 'Error deleting complaint', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 pb-16">
      <Navbar showAccount showLogout />
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="mx-auto w-full max-w-6xl px-4 pt-8">
        <div className="flex flex-col items-start justify-between gap-4 pb-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Staff portal</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">Welcome {name}</p>
            <p className="mt-1 text-sm text-gray-600">
              Review, filter, and resolve assigned hostel complaints.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700">
              <span className="mr-2 font-semibold">Sort:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-0 bg-transparent text-xs outline-none focus:ring-0"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
          </div>
          <button
            onClick={() => setShowFilter(true)}
              className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-red-600"
          >
              Filter complaints
          </button>
          </div>
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
                    className="ml-6 w-72 h-8 border rounded px-2"
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
                    <option value="pending">Pending (with you)</option>
                    <option value="waiting_approval">Waiting for student approval</option>
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
            No complaints assigned yet. New tickets will appear here as they are routed to you.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complaints
              .filter((c) => c.delete_by_staff === 0)
              .slice()
              .sort((a, b) =>
                sortOrder === 'newest'
                  ? new Date(b.created_at) - new Date(a.created_at)
                  : new Date(a.created_at) - new Date(b.created_at)
              )
              .map((complaint) => (
                <div
                  key={complaint._id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {complaint.student?.full_name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Contact: {complaint.student?.phone} • Hostel: {complaint.student?.hostel?.hostel_name} •
                    Room {complaint.student?.room_no}
                  </p>
                  <h4 className="mt-2 text-xs font-medium text-gray-600">
                    Created: {new Date(complaint.created_at).toLocaleString()}
                  </h4>
                  <h4 className="text-xs font-medium text-gray-600">
                    Resolved:{' '}
                    {complaint.resolved_at ? new Date(complaint.resolved_at).toLocaleString() : 'N/A'}
                  </h4>
                  <p className="mt-2 text-xs text-gray-700">{complaint.description}</p>
                  {complaint.status ? (
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
                      <h4 className="mb-2 text-xs font-medium text-gray-700">Status: Assigned</h4>
                      <button
                        onClick={() => handleResolve(complaint._id)}
                        className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-600"
                      >
                        Update To Completed
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;

