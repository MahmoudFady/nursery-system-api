const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
const childSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 4,
    max: 10,
  },
  level: {
    type: String,
    required: true,
    enum: ["PreKG", "KG1", "KG2"],
  },
  address: addressSchema,
});
module.exports = mongoose.model("Children", childSchema);
