const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Hostel = require("../models/Hostel");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ category_id: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ hostel_id: 1 });
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
