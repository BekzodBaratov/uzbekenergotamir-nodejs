const router = require("express").Router();
const { User } = require("../models/users.model");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "email or password is invalid" });

  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) return res.status(404).json({ success: false, message: "email or password is invalid" });

  const token = user.generateAuthToken();

  res
    .status(200)
    .header("Authorization", "Bearer " + token)
    .json({
      success: true,
      message: "you success signin",
      user: _.pick(user, ["_id", "username", "email", "role"]),
      token,
    });
});

module.exports = router;
