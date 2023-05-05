const express = require("express");
const router = express.Router();
const controller = require("../controller/admin");
const validator = require("../middlewares/validation/admin");
const validationResult = require("../middlewares/validation/check-validation-result");
const checkAuth = require("../middlewares/check-auth");
router
  .route("/admins")
  .all(checkAuth, checkAuth.isAdmin)
  .get(controller.getAll)
  .post(validator.insert, validationResult, controller.insertOne);
router
  .route("/admins/:id")
  .all(checkAuth, checkAuth.isAdmin, validator.isMongoId, validationResult)
  .get(controller.getOne)
  .delete(controller.deleteOne);
module.exports = router;
