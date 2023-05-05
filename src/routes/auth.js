const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validation/signin");
const validationResult = require("../middlewares/validation/check-validation-result");
const controller = require("../controller/auth");
router.post(
  "/auth/signin",
  validator.signin,
  validationResult,
  controller.signin
);
module.exports = router;
