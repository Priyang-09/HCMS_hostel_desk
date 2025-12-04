const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Complaint = require("../models/Complaint");

const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate("hostel");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id).populate("category");
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const { name, email, contact, hostel, room } = req.body;

    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.full_name = name;
    student.email = email;
    student.phone = contact;
    student.hostel = hostel;
    student.room_no = room;

    await student.save();
    await student.populate("hostel");

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStaffProfile = async (req, res) => {
  try {
    const { name, email, contact } = req.body;

    const staff = await Staff.findById(req.user.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    staff.full_name = name;
    staff.email = email;
    staff.phone = contact;

    await staff.save();
    await staff.populate("category");

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeStudentPassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== old_password) {
      return res.status(400).json({ message: "Incorrect account password" });
    }

    if (new_password !== confirm_password) {
      return res
        .status(400)
        .json({
          message:
            "Please make sure confirm password matches the newly entered password.",
        });
    }

    if (old_password === new_password) {
      return res
        .status(400)
        .json({ message: "Please choose a different password" });
    }

    student.password = new_password;
    await student.save();

    res.json({ message: "Password changed successfully, please login again." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeStaffPassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    const staff = await Staff.findById(req.user.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (staff.password !== old_password) {
      return res.status(400).json({ message: "Incorrect account password" });
    }

    if (new_password !== confirm_password) {
      return res
        .status(400)
        .json({
          message:
            "Please make sure confirm password matches the newly entered password.",
        });
    }

    if (old_password === new_password) {
      return res
        .status(400)
        .json({ message: "Please choose a different password" });
    }

    staff.password = new_password;
    await staff.save();

    res.json({ message: "Password changed successfully, please login again." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudentAccount = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStaffAccount = async (req, res) => {
  try {
    const pendingComplaints = await Complaint.find({
      staff: req.user.id,
      status: false,
    });

    if (pendingComplaints.length > 0) {
      return res
        .status(400)
        .json({
          message: "Cannot delete account, please complete pending requests.",
        });
    }

    await Staff.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentProfile,
  getStaffProfile,
  updateStudentProfile,
  updateStaffProfile,
  changeStudentPassword,
  changeStaffPassword,
  deleteStudentAccount,
  deleteStaffAccount,
};
