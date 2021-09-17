const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../auth/secrets/index");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const formattedToken = token.replace('Bearer', '').trim()
  if (!formattedToken) {
    return next({ status: 401, message: "token required" });
  }
  jwt.verify(formattedToken, JWT_SECRET, (err, decodedToken) => {
    if (err) return next({ status: 401, message: "token invalid" });
    req.decodedToken = decodedToken;
    next();
  });
};