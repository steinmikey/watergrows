const jwt = require("jsonwebtoken");
const { SECRET } = require("../secrets/index");

const restrict = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: 401, message: `token required` });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return next({ status: 401, message: "invalid token" });
    }
    req.decoded = decoded;
    return next();
  });
};

module.exports = {
  restrict
};
