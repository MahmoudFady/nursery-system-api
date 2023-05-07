const Class = require("../models/class");
module.exports.getAll = (req, res, next) => {
  Class.find()
    .then((classes) => {
      res.status(200).json({ message: "get all class info", classes });
    })
    .catch((err) => next(err));
};
module.exports.getOneById = (req, res, next) => {
  Class.findById(req.params["id"])
    .then((data) => {
      res.status(200).json({ message: "get  class info", class: data });
    })
    .catch((err) => next(err));
};
module.exports.insertOne = (req, res, next) => {
  const { name, teacher, children } = req.body;
  const _id = Date.now() + Math.random() * 100;
  new Class({ _id, name, teacher, children })
    .save()
    .then((newClass) => {
      res.status(201).json({ message: "class created", class: newClass });
    })
    .catch((err) => next(err));
};
module.exports.deleteOne = (req, res, next) => {
  Class.findByIdAndDelete(req.params["id"])
    .then((data) => {
      if (!data) throw new Error("class does not exist");
      res.status(200).json({ message: "class deleted", class: data });
    })
    .catch((err) => next(err));
};
module.exports.patchOne = (req, res, next) => {
  Class.findByIdAndUpdate(req.params["id"], { $set: req.body }, { new: true })
    .then((data) => {
      if (!data) throw new Error("class does not exist");
      res.status(200).json({ message: "class updated", class: data });
    })
    .catch((err) => next(err));
};
module.exports.getChildren = (req, res, next) => {
  Class.findById(req.params["id"], { children: 1 })
    .populate({ path: "children" })
    .then((data) => {
      if (!data) throw new Error("class does not exist");
      res
        .status(200)
        .json({ message: "get  class children info", class: data });
    })
    .catch((err) => next(err));
};
module.exports.getTeacher = (req, res, next) => {
  Class.findById(req.params["id"], { teacher: 1 })
    .populate({ path: "teacher" })
    .then((data) => {
      if (!data) throw new Error("class does not exist");
      res.status(200).json({ message: "get  class teacher info", class: data });
    })
    .catch((err) => next(err));
};
