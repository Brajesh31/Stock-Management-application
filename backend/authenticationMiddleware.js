const jwt = require("jsonwebtoken");
const tokenModel = require("./models/token");
module.exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const matchQuery = await tokenModel.findOne({ token: token });

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "No token provided" });
  }
  if (matchQuery === null) {
    return res
      .status(400)
      .json({ success: false, message: "Session Time Out" });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.userId = decoded.userId;
    req.userName = decoded.userName;
    next();
  });
};
