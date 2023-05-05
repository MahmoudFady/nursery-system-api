const jwt = require("jsonwebtoken");
module.exports.create = (data, expiresIn = "1d", key = process.env.JWT_KEY) => {
  return jwt.sign(data, key, { expiresIn });
};
module.exports.verify = (token, key = process.env.JWT_KEY) => {
  return jwt.verify(token, key);
};
