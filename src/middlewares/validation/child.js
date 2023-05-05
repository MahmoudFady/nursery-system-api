const { body, param } = require("express-validator");
module.exports.isMongoId = [
  param("id").isNumeric().withMessage("invalid id child"),
];
module.exports.insert = [
  body("fullName")
    .isAlpha("en-AU", { ignore: " " })
    .withMessage("Name must be contains chars only")
    .isLength({ min: 6, max: 15 })
    .withMessage("Name must be between 5 to 15 chars "),
  body("age")
    .isNumeric({ min: 6, max: 10 })
    .withMessage("Age must be between 6 to 10 years"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Invalid child level"),
  body("address")
    .isObject({})
    .withMessage("Invalid address")
    .custom((address) => {
      const addressBodyKeys = Object.keys(address).sort();
      const keys = ["city", "street", "building"].sort();
      return addressBodyKeys.toString() == keys;
    })
    .withMessage("invalid address props"),
  body("address.city").notEmpty().withMessage("City is required"),
  body("address.street").notEmpty().withMessage("Street is required"),
  body("address.building").notEmpty().withMessage("Building is required"),
];
module.exports.update = module.exports.insertOne = [
  ...this.isMongoId,
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .isLength({ min: 6, max: 15 })
    .withMessage("Name must be between 6 and 15 characters"),
  body("age")
    .optional()
    .isNumeric({ min: 6, max: 10 })
    .withMessage("Age must be between 6 and 10"),
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must be one of: PreKG, KG1, KG2"),
  body("address")
    .optional()
    .isObject()
    .custom((address) => {
      const addressBodyKeys = Object.keys(address).sort();
      const keys = ["city", "street", "building"].sort();
      return addressBodyKeys.toString() == keys;
    })
    .withMessage("invalid address props"),
  body("address.city").optional().notEmpty().withMessage("City is required"),

  body("address.street")
    .optional()
    .notEmpty()
    .withMessage("Street is required"),

  body("address.building")
    .optional()
    .notEmpty()
    .withMessage("Building is required"),
];
