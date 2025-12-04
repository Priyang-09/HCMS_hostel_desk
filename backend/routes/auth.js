const express = require("express");
const router = express.Router();
const {
  studentLogin,
  staffLogin,
  studentSignup,
  staffSignup,
} = require("../controllers/authController");

router.post("/student/login", studentLogin);
router.post("/staff/login", staffLogin);
router.post("/student/signup", studentSignup);
router.post("/staff/signup", staffSignup);

module.exports = router;
