const jwtUtil = require("../utils/jwt-token");
const Class = require("../models/class");
const generateRoleAuth = (condition, next) => {
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
  const condition = role === "admin";
  return generateRoleAuth(condition, next);
};
module.exports.isTeacher = (req, res, next) => {
  const role = req["user"].role;
  const condition = role === "teacher";
  return generateRoleAuth(condition, next);
};
module.exports.isAdminOrTeacher = (req, res, next) => {
  const role = req["user"].role;
  const condition = role === "admin" || role === "teacher";
  return generateRoleAuth(condition, next);
};
module.exports.isAdminOrSupervisor = async (req, res, next) => {
  const role = req.user.role;
  const teacherId = req.user.id;
  const classId = req.params["id"];
  let isSupervisor;
  if (role === "teacher") {
    isSupervisor =
      (await Class.findOne({ _id: classId, teacher: teacherId })) || false;
  }
  if (role === "admin" || isSupervisor) return next();
  const err = new Error("Action not allowed for you ");
  err.status = 401;
  throw err;
};
module.exports.isAdminOrAllowedTeacher = (req, res, next) => {
  const role = req.user.role;
  const isAuthTeacher = req.user.id == req.params["id"];
  if (role === "admin" || isAuthTeacher) return next();
  const err = new Error("Action not allowed for you ");
  err.status = 401;
  throw err;
};
