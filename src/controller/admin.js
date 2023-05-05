const Admin = require("../models/admin");
module.exports.getAll = (req, res, next) => {
  Admin.find({})
    .select("-password")
    .then((admins) => {
      res.status(200).json({ message: "get list of admins", admins });
    })
    .catch((err) => next(err));
};
module.exports.getOne = (req, res, next) => {
  Admin.findById(req.params["id"])
    .select("-password")
    .then((admins) => {
      res.status(200).json({ message: "get list of admins", admins });
    })
    .catch((err) => next(err));
};
module.exports.insertOne = (req, res, next) => {
  const { fullName, email, password } = req.body;
  new Admin({ fullName, email, password })
    .save()
    .then((admin) => {
      res.status(200).json({ message: "new admin created", id: admin._id });
    })
    .catch((err) => next(err));
};
module.exports.deleteOne = (req, res, next) => {
  Admin.findByIdAndDelete(req.params["id"])
    .then((deletedAdmin) => {
      res.status(200).json({ message: "admin deleted", deletedAdmin });
    })
    .catch((err) => next(err));
};
