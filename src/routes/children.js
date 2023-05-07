const express = require("express");
const router = express.Router();
const controller = require("../controller/children");
const validator = require("../middlewares/validation/child");
const validationResult = require("../middlewares/validation/check-validation-result");
const chekcAuth = require("../middlewares/check-auth");
router
  .route("/children")
  .all(chekcAuth, chekcAuth.isAdmin)
  .get(controller.getAll)
  .post(validator.insert, validationResult, controller.insertOne);
router
  .route("/children/:id")
  .all(chekcAuth)
  .get(controller.getAll)
  .get(validator.isMongoId, validationResult, controller.getOneById)
  .patch(validator.update, validationResult, controller.patchOne)
  .delete(validator.isMongoId, validationResult, controller.deleteOne);
router
  .route("/children/:id/class")
  .all(chekcAuth, chekcAuth.isAdminOrSupervisor)
  .get(validator.isMongoId, validationResult, controller.getClass);
module.exports = router;
