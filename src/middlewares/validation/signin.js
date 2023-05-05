const { body } = require("express-validator");
module.exports.signin = [
  body("email")
    .exists()
    .withMessage("email is required")
    .notEmpty()
    .withMessage("email can't be empty")
    .isEmail()
    .withMessage("invalid email form"),
  body("password")
    .exists()
    .withMessage("password is required")
    .notEmpty()
    .withMessage("password can't be empty"),
  body("role")
    .exists()
    .withMessage("role is required")
    .notEmpty()
    .withMessage("role can't be empty")
    .isIn(["admin", "teacher"])
    .withMessage("invalid role"),
];
