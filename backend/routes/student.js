const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getStudentProfile,
  updateStudentProfile,
  changeStudentPassword,
  deleteStudentAccount,
} = require("../controllers/profileController");

router.get("/profile", auth, getStudentProfile);
router.put("/profile", auth, updateStudentProfile);
router.post("/change-password", auth, changeStudentPassword);
router.delete("/account", auth, deleteStudentAccount);

module.exports = router;
