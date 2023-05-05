const Teacher = require("../models/teacher");
const fileUtil = require("../utils/file");
module.exports.getAll = (req, res, next) => {
  Teacher.find()
    .then((teachers) => {
      res.status(200).json({ message: "get all teachers", teachers });
    })
    .catch((err) => next(err));
};
module.exports.getOneById = (req, res, next) => {
  Teacher.findById(req.params["id"])
    .then((teacher) => {
      if (!teacher) throw new Error("teacher does't exist");
      res.status(200).json({
        message: "get teacher data",
        teacher,
      });
    })
    .catch((err) => next(err));
};
module.exports.insertOne = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  try {
    const image = fileUtil.getUploadFilePath(req);
    const teacher = await new Teacher({
      fullName,
      email,
      image,
      password,
    }).save();
    res.status(201).json({ message: "teacher created", teacher });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteOne = (req, res, next) => {
  Teacher.findByIdAndDelete(req.params["id"])
    .then((teacher) => {
      if (!teacher) throw new Error("teacher does't exist");
      return fileUtil.delete(teacher.image, "teachers");
    })
    .then(() => {
      res.status(200).json({ message: "teacher deleted" });
    })
    .catch((err) => next(err));
};
module.exports.patchOne = (req, res, next) => {
  res.status(200).json({ message: "delete one" });
};
module.exports.getClasses = (req, res, next) => {
  res.status(200).json({ message: "get superviced classes" });
};
