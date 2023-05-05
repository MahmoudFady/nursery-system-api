const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  children: {
    type: [
      {
        type: Number,
        ref: "Children",
      },
    ],
    min: 1,
    max: 10,
  },
});
module.exports = mongoose.model("Class", classSchema);
