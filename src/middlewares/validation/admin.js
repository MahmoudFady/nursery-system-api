const { body } = require("express-validator");
const isMongoId = [
  body("id").not().isMongoId().withMessage("Invalid admin id"),
];
module.exports.insert = [
  body("fullName")
    .notEmpty()
    .withMessage("fullName is required")
    .isAlpha("en-AU", { ignore: " " })
    .isString()
    .withMessage("fullName must be string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .exists()
    .withMessage("Password is required"),
];
module.exports.isMongoId = isMongoId;
