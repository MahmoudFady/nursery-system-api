const { encrypt } = require("../utils/password");
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});
adminSchema.pre("save", async function (next) {
  if (this.isNew) this.password = await encrypt(this.password);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
