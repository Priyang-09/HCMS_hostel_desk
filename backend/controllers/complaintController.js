const Complaint = require("../models/Complaint");
const assignStaff = require("../utils/assignStaff");
const filterComplaints = require("../utils/filterComplaints");
const autoResolveComplaints = require("../utils/autoResolveComplaints");

const getStudentComplaints = async (req, res) => {
  try {
    await autoResolveComplaints();

    const complaints = await Complaint.find({
      student: req.user.id,
      delete_by_student: 0,
    })
      .populate("category", "category_name")
      .populate("staff", "full_name phone")
      .sort({ created_at: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStaffComplaints = async (req, res) => {
  try {
    await autoResolveComplaints();
    const complaints = await Complaint.find({
      staff: req.user.id,
      delete_by_staff: 0,
    })
      .populate("category", "category_name")
      .populate("student", "full_name phone hostel room_no")
      .populate("student.hostel", "hostel_name")
      .sort({ created_at: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitComplaint = async (req, res) => {
  try {
    const { category, complaint: description } = req.body;

    const activeCount = await Complaint.countDocuments({
      student: req.user.id,
      category,
      status: false,
      delete_by_student: 0,
      delete_by_staff: 0,
    });

    if (activeCount >= 2) {
      return res.status(400).json({
        message:
          "You already have 2 pending complaints in this category. Please wait until some are resolved before creating a new one.",
      });
    }

    const staffId = await assignStaff(category);

    const complaint = new Complaint({
      category,
      student: req.user.id,
      staff: staffId,
      description,
    });

    await complaint.save();
    await complaint.populate("category", "category_name");
    await complaint.populate("staff", "full_name phone");

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const now = new Date();
    complaint.workflow_status = "waiting_approval";
    complaint.approval_deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    complaint.resolved_at = complaint.resolved_at || now;

    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.student.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to approve this complaint" });
    }

    if (complaint.workflow_status !== "waiting_approval") {
      return res.status(400).json({ message: "Complaint is not waiting for approval" });
    }

    const now = new Date();
    complaint.workflow_status = "resolved";
    complaint.status = true;
    complaint.resolved_at = now;
    complaint.approval_deadline = null;

    await complaint.save();

    if (complaint.staff) {
      const Staff = require("../models/Staff");
      await Staff.findByIdAndUpdate(complaint.staff, {
        $inc: { count: -1 },
      });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reraiseComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.student.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to re-raise this complaint" });
    }

    if (complaint.workflow_status !== "waiting_approval") {
      return res.status(400).json({ message: "Complaint is not waiting for approval" });
    }

    const now = new Date();

    if (complaint.approval_deadline && complaint.approval_deadline < now) {
      return res.status(400).json({
        message: "Re-raise window has expired. The complaint will be resolved automatically.",
      });
    }

    if (complaint.reraises_count >= 2) {
      return res.status(400).json({
        message: "You have already re-raised this complaint the maximum number of times.",
      });
    }

    complaint.reraises_count += 1;
    complaint.workflow_status = "pending";
    complaint.approval_deadline = null;

    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterComplaintsHandler = async (req, res) => {
  try {
    const filters = {
      date: req.body.datepicker || null,
      category: req.body.category || null,
      status: req.body.status || null,
      approvalStatus: req.body.approvalStatus || null,
    };

    const userType = req.user.type;
    const userId = req.user.id;

    const complaints = await filterComplaints(filters, userType, userId);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteByStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.delete_by_student = 1;
    await complaint.save();

    res.json({ message: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteByStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.delete_by_staff = 1;
    await complaint.save();

    res.json({ message: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentComplaints,
  getStaffComplaints,
  submitComplaint,
  updateStatus,
  approveComplaint,
  reraiseComplaint,
  filterComplaintsHandler,
  deleteByStudent,
  deleteByStaff,
};
