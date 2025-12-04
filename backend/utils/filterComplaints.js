const Complaint = require("../models/Complaint");
const autoResolveComplaints = require("./autoResolveComplaints");

const filterComplaints = async (filters, userType, userId) => {
  try {
    await autoResolveComplaints();
    const query = {};

    if (userType === "student") {
      query.student = userId;
      query.delete_by_student = 0;
    } else if (userType === "staff") {
      query.staff = userId;
      query.delete_by_staff = 0;
    }

    if (filters.date) {
      const startDate = new Date(filters.date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(filters.date);
      endDate.setHours(23, 59, 59, 999);
      query.created_at = { $gte: startDate, $lte: endDate };
    }

    if (filters.category && filters.category !== "None") {
      query.category = filters.category;
    }

    if (filters.status !== undefined && filters.status !== "None") {
      query.status = filters.status === "1" || filters.status === 1;
    }

    if (filters.approvalStatus && filters.approvalStatus !== "None") {
      query.workflow_status = filters.approvalStatus;
    }

    const complaints = await Complaint.find(query)
      .populate("category", "category_name")
      .populate("student", "full_name phone hostel room_no")
      .populate("staff", "full_name phone")
      .populate("student.hostel", "hostel_name")
      .sort({ created_at: -1 });

    return complaints;
  } catch (error) {
    throw error;
  }
};

module.exports = filterComplaints;
