const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getStudentComplaints,
  getStaffComplaints,
  submitComplaint,
  updateStatus,
  approveComplaint,
  reraiseComplaint,
  filterComplaintsHandler,
  deleteByStudent,
  deleteByStaff,
} = require("../controllers/complaintController");

router.get("/student", auth, getStudentComplaints);
router.post("/student", auth, submitComplaint);
router.post("/student/filter", auth, filterComplaintsHandler);
router.put("/student/:id/delete", auth, deleteByStudent);
router.put("/student/:id/approve", auth, approveComplaint);
router.put("/student/:id/reraise", auth, reraiseComplaint);

router.get("/staff", auth, getStaffComplaints);
router.post("/staff/filter", auth, filterComplaintsHandler);
router.put("/staff/:id/resolve", auth, updateStatus);
router.put("/staff/:id/delete", auth, deleteByStaff);

module.exports = router;
