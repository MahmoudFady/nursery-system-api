const bcrypt = require("bcrypt");
module.exports.encrypt = (password, salt = 10) => {
  return bcrypt.hash(password, salt);
};
module.exports.isMatched = (password, hash) => {
  return bcrypt.compare(password, hash);
};
