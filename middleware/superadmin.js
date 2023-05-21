const author = (req, res, next) => {
  const { role } = req.user;

  if (role === "superadmin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "you cannot access this page" });
  }
};

module.exports = author;
