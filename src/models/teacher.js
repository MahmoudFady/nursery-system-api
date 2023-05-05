const mongoose = require("mongoose");
const passwordUtil = require("../utils/password");
const teacherSchema = new mongoose.Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
teacherSchema.pre("save", async function (next) {
  if (this.isNew) this.password = await passwordUtil.encrypt(this.password);
  next();
});
module.exports = mongoose.model("Teacher", teacherSchema);
