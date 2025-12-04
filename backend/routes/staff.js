const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getStaffProfile,
  updateStaffProfile,
  changeStaffPassword,
  deleteStaffAccount,
} = require("../controllers/profileController");

router.get("/profile", auth, getStaffProfile);
router.put("/profile", auth, updateStaffProfile);
router.post("/change-password", auth, changeStaffPassword);
router.delete("/account", auth, deleteStaffAccount);

module.exports = router;
