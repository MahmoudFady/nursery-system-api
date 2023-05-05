const { body, param } = require("express-validator");
module.exports.isMongoId = [
  param("id").isMongoId().withMessage("invalid teacher id"),
];

module.exports.insert = [
  body("fullName")
    .notEmpty()
    .withMessage("fullName is required")
    .isAlpha("en-AU", { ignore: " " })
    .isString()
    .withMessage("fullName must be string"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];
module.exports.update = [
  body("fullName")
    .optional()
    .notEmpty()
    .withMessage("fullName is required")
    .isAlpha("en-AU", { ignore: " " })
    .isString()
    .withMessage("fullName must be string"),
  body("password").optional().notEmpty().withMessage("Password is required"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("image").optional().notEmpty().withMessage("Image is required"),
  ...this.isMongoId,
];
