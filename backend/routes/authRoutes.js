const express = require("express");
const router = express.Router();
const { body, oneOf } = require("express-validator");
const authController = require("../Controller/authController");
router.post(
  "/logOut",
  [body("token", "please Provide Token").trim()],
  authController.logOut
);
router.post(
  "/signIn",
  [
    body("email", "Enter the valid email").isEmail().normalizeEmail(),
    body("password", "Password is required").notEmpty(),
  ],
  authController.signIn
);
router.post(
  "/signUp",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }).trim().escape(),
    body("username", "Enter valid username")
      .isLength({ min: 3 })
      .trim()
      .escape(),
    body("email", "Enter the valid email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*()\-_=+{};:,<.>]/)
      .withMessage("Password must contain at least one special character"),
    body("confirmPassword").custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("confirm password and password should be same");
      }
      return true;
    }),
  ],
  authController.signUp
);
module.exports = router;
