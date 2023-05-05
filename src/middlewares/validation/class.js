const Children = require("../../models/children");
const Teacher = require("../../models/teacher");
const isTeacherExist = async (id) => {
  const teacher = await Teacher.findById(id);
  if (!teacher) throw new Error("teacher does not exist");
};
const isChildExist = async (ids) => {
  for (let id of ids) {
    const child = await Children.findById(id);
    if (!child) throw new Error("child does not exist");
  }
};
const { body, param } = require("express-validator");
module.exports.isMongoId = [
  param("id").isNumeric().withMessage("invalid class id"),
];

module.exports.insert = [
  body("teacher").custom(isTeacherExist),
  body("children").custom(isChildExist),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be string"),
  body("teacher")
    .notEmpty()
    .withMessage("Supervisor is required")
    .isMongoId()
    .withMessage("Invalid teacher id"),
  body("children")
    .notEmpty()
    .withMessage("Children are required")
    .isArray({ min: 1, max: 10 })
    .withMessage("class must has at lest one child")
    .custom((children) => {
      return children.every((child) => typeof child === "number");
    })
    .withMessage("child ids must be number"),
];

module.exports.update = [
  body("teacher").optional().custom(isTeacherExist),
  body("children").optional().custom(isChildExist),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha()
    .isString()
    .withMessage("name must be string"),
  body("supervisor")
    .optional()
    .notEmpty()
    .withMessage("Supervisor is required")
    .isMongoId()
    .withMessage("Invalid supervisor"),
  body("children")
    .optional()
    .notEmpty()
    .withMessage("Children are required")
    .isArray({ min: 1 })
    .withMessage("class children's must be grather 0")
    .custom((children) => {
      return children.every((child) => typeof child === "number");
    })
    .withMessage("child ids must be number"),
  ...this.isMongoId,
];
