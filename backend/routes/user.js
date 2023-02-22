const express = require("express");
var router = express.Router(); // route level middle-ware (index)
var authController = require("../controllers/authController.js");
var userController = require("../controllers/userController.js");

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.logIn);
router.route("/forgetPassword").post(authController.forgetPassword);
router
  .route("/updatePassword")
  .patch(authController.protect, authController.updatePassword);
router
  .route("/resetPassword/:token")
  .patch(authController.protect, authController.resetPassword);

router.route("/").get(userController.getAllUsers);

module.exports = router;
