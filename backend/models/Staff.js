const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staff_id: {
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Staff", staffSchema);
