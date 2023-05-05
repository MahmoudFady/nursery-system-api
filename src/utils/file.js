const fs = require("fs");
const path = require("path");
module.exports.delete = (filePath, dir) => {
  filePath = path.join(
    __dirname,
    "../../uploads",
    dir,
    path.basename(filePath)
  );
  return fs.unlinkSync(filePath);
};
module.exports.getUploadFilePath = (req) => {
  const filePath = `${req.protocol}://${req.get("host")}/uploads${req.url}/${
    req.file.filename
  }`;
  return filePath;
};
