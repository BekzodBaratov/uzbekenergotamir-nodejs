const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const auth = req.header("Authorization");
  if (!auth) return res.status(400).json({ success: false, message: "token not found" });
  const token = auth.split(" ")[1];

  const isVerifyed = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = { _id: isVerifyed._id, role: isVerifyed.role };
  next();
}

module.exports = auth;
