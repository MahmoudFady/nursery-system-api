const jwtUtil = require("../utils/jwt-token");
const generateRoleAuth = (req, next, condition) => {
  if (condition) return next();
  const err = new Error("Action not allowed for you ");
  err.status = 401;
  throw err;
};
module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwtUtil.verify(token);
    req["user"] = user;
    next();
  } catch (err) {
    err = new Error(err.message);
    err.status = 401;
    next(err);
  }
};
module.exports.isAdmin = (req, res, next) => {
  const role = req["user"].role;
  return generateRoleAuth(next, role === "admin");
};
module.exports.isTeacher = (req, res, next) => {
  const role = req["user"].role;
  return generateRoleAuth(next, role === "teacher");
};
module.exports.isAdminOrTeacher = (req, res, next) => {
  const role = req["user"].role;
  return generateRoleAuth(next, role === "admin" || role === "teacher");
};
