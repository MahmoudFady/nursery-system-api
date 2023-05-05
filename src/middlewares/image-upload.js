const multer = require("multer");
const path = require("path");
const whiteExtentions = [".png", ".jpeg", ".jpg"];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads" + req.url);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (whiteExtentions.includes(ext)) return cb(null, true);
  const err = new Error("file not allowed");
  err.status = 406;
  return cb(err);
};
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000 },
});
