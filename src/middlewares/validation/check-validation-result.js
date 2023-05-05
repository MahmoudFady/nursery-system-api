const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const msgs = result.errors.map((err) => err.msg);
    throw new Error(msgs);
  }
  next();
};
