const Teacher = require("../models/teacher");
const Admin = require("../models/admin");
const { isMatched } = require("../utils/password");
const jwtUtil = require("../utils/jwt-token");
module.exports.signin = async (req, res, next) => {
  const { email, password, role } = req.body;
  const schema = { teacher: Teacher, admin: Admin };
  try {
    const user = await schema[role].findOne({ email });
    if (!user) throw new Error("wrong email or password");
    const isPassMatched = await isMatched(password, user.password);
    if (!isPassMatched) throw new Error("wrong email or password");
    user._doc["role"] = role;
    const token = jwtUtil.create({ id: user._id, role });
    res.status(200).json({ message: "auth sucess", user, token });
  } catch (err) {
    next(err);
  }
};
