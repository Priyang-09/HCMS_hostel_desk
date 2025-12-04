const Complaint = require("../models/Complaint");
const Staff = require("../models/Staff");

const autoResolveComplaints = async () => {
  const now = new Date();

  const expiredComplaints = await Complaint.find({
    workflow_status: "waiting_approval",
    approval_deadline: { $lte: now },
  });

  if (!expiredComplaints.length) return;

  for (const complaint of expiredComplaints) {
    complaint.workflow_status = "resolved";
    complaint.status = true;
    complaint.resolved_at = complaint.resolved_at || now;
    complaint.approval_deadline = null;

    await complaint.save();

    if (complaint.staff) {
      await Staff.findByIdAndUpdate(complaint.staff, {
        $inc: { count: -1 },
      });
    }
  }
};

module.exports = autoResolveComplaints;


