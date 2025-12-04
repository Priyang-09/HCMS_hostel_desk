const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Staff = require("../models/Staff");

const studentLogin = async (req, res) => {
  try {
    const { id, password } = req.body;

    const student = await Student.findOne({ student_id: id }).populate(
      "hostel"
    );
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = password === student.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id, student_id: student.student_id, type: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: student._id,
        student_id: student.student_id,
        full_name: student.full_name,
        type: "student",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const staffLogin = async (req, res) => {
  try {
    const { id, password } = req.body;

    const staff = await Staff.findOne({ staff_id: id }).populate("category");
    if (!staff) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = password === staff.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: staff._id, staff_id: staff.staff_id, type: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: staff._id,
        staff_id: staff.staff_id,
        full_name: staff.full_name,
        type: "staff",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const studentSignup = async (req, res) => {
  try {
    const { id, full_name, email, phone, password, hostel, roomno } = req.body;

    const existingStudent = await Student.findOne({
      $or: [{ student_id: id }, { email }],
    });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = new Student({
      student_id: id,
      full_name,
      email,
      phone,
      password,
      hostel,
      room_no: roomno,
    });

    await student.save();
    res
      .status(201)
      .json({ message: "Account created successfully, please login" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const staffSignup = async (req, res) => {
  try {
    const { id, full_name, email, phone, password, category } = req.body;

    const existingStaff = await Staff.findOne({
      $or: [{ staff_id: id }, { email }],
    });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff already exists" });
    }

    const staff = new Staff({
      staff_id: id,
      full_name,
      email,
      phone,
      password,
      category,
    });

    await staff.save();
    res
      .status(201)
      .json({ message: "Account created successfully, please login" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  studentLogin,
  staffLogin,
  studentSignup,
  staffSignup,
};
