const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    hostel_id: {
      type: Number,
      required: true,
      unique: true,
    },
    hostel_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Hostel", hostelSchema);
