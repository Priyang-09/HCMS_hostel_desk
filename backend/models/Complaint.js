const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    workflow_status: {
      type: String,
      enum: ["pending", "waiting_approval", "resolved"],
      default: "pending",
    },
    approval_deadline: {
      type: Date,
      default: null,
    },
    reraises_count: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    resolved_at: {
      type: Date,
      default: null,
    },
    delete_by_student: {
      type: Number,
      default: 0,
    },
    delete_by_staff: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
