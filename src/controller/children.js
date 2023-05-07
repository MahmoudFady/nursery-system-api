const Children = require("../models/children");
const Class = require("../models/class");

module.exports.getAll = (req, res, next) => {
  Children.find()
    .then((children) => {
      res.status(200).json({ message: "get all children", children });
    })
    .catch((err) => next(err));
};
module.exports.getOneById = (req, res, next) => {
  Children.findById(req.params["id"])
    .then((child) => {
      if (!child) throw new Error("child does not exist");
      res.status(200).json({ message: "get child info", child });
    })
    .catch((err) => next(err));
};
module.exports.insertOne = (req, res, next) => {
  const { fullName, age, level, address } = req.body;
  const _id = Date.now() + Math.random() * 100;
  new Children({ _id, fullName, age, level, address })
    .save()
    .then((child) => {
      res.status(200).json({ message: "get all children", child });
    })
    .catch((err) => next(err));
};
module.exports.deleteOne = async (req, res, next) => {
  const id = req.params["id"];
  try {
    const deletedChild = await Children.findByIdAndDelete(id);
    if (!deletedChild) throw new Error("child does not exist");
    await Class.updateMany(
      { children: { $in: [id] } },
      { $pull: { children: id } }
    );
    res.status(200).json({ message: "child deleted", child: deletedChild });
  } catch (err) {
    next(err);
  }
};
module.exports.patchOne = (req, res, next) => {
  Children.findByIdAndUpdate(req.params["id"], {
    $set: req.body,
  })
    .then((child) => {
      if (!child) throw new Error("child does not exist");
      res.status(200).json({ message: "child updated", child });
    })
    .catch((err) => next(err));
};
module.exports.getClass = (req, res, next) => {
  Class.find({ children: { $in: [req.params.id] } })
    .populate({ path: "children", select: "fullName age" })
    .populate({ path: "teacher", select: "fullName image" })
    .then((classes) => {
      res.status(200).json({ message: "get child classes", classes });
    })
    .catch((err) => next(err));
};
