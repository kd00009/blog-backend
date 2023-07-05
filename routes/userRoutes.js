const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

// routeer object

const router = express.Router();

// get all user
router.get("/all-users", getAllUsers);

//  create user
router.post("/register", registerController);

// login

router.post("/login", loginController);

module.exports = router;
