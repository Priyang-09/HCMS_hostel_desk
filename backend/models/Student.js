const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
    room_no: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Student", studentSchema);
