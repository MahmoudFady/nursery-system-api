const express = require("express");
const router = express.Router();
const controller = require("../controller/class");
const checkAuth = require("../middlewares/check-auth");
const validator = require("../middlewares/validation/class");
const validationResult = require("../middlewares/validation/check-validation-result");

router
  .route("/class")
  .all(checkAuth, checkAuth.isAdmin)
  .get(controller.getAll)
  .post(validator.insert, validationResult, controller.insertOne);
router
  .route("/class/:id")
  .all(checkAuth, checkAuth.isAdminOrSupervisor)
  .get(
    checkAuth.isAdminOrTeacher,
    validator.isMongoId,
    validationResult,
    controller.getOneById
  )
  .patch(
    checkAuth.isAdmin,
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
router
  .route("/class/:id/children")
  .all(checkAuth, checkAuth.isAdminOrTeacher)
  .get(validator.isMongoId, validationResult, controller.getChildren);
router
  .route("/class/:id/teacher")
  .all(checkAuth)
  .get(
    validator.isMongoId,
    validationResult,
    checkAuth.isAdminOrSupervisor,
    controller.getTeacher
  );

module.exports = router;
