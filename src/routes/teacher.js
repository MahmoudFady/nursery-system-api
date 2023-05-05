const express = require("express");
const router = express.Router();

const controller = require("../controller/teacher");
const validator = require("../middlewares/validation/teacher");
const validationResult = require("../middlewares/validation/check-validation-result");
const checkAuth = require("../middlewares/check-auth");
const imageUpload = require("../middlewares/image-upload");
router
  .route("/teachers")
  .all(checkAuth, checkAuth.isAdmin)
  .get(controller.getAll)
  .post(imageUpload.single("image"), controller.insertOne);
router
  .route("/teachers/supervise")
  .all(checkAuth, checkAuth.isAdminOrTeacher)
  .get(validator.isMongoId, validationResult, controller.getClasses);
router
  .route("/teachers/:id")
  .all(checkAuth)
  .get(
    checkAuth.isAdminOrTeacher,
    validator.isMongoId,
    validationResult,
    controller.getOneById
  )
  .patch(
    checkAuth.isAdminOrTeacher,
    validator.update,
    validationResult,
    controller.patchOne
  )
  .delete(
    checkAuth.isAdmin,
    validator.isMongoId,
    validationResult,
    controller.deleteOne
  );

module.exports = router;
