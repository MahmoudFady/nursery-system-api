const jwt = require("jsonwebtoken");
module.exports.create = (data, duration = "1d", key = process.env.JWT_KEY) => {
  return jwt.sign(data, key, { expiresIn: duration });
};
module.exports.verify = (token, key = process.env.JWT_KEY) => {
  return jwt.verify(token, key);
};
