const { User, validation } = require("../models/users.model");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, users });
};
const addUser = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const { email, password, username } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: passwordHash, username });
  const token = user.generateAuthToken();

  res
    .status(201)
    .header("Authorization", `Bearer ${token}`)
    .json({
      success: true,
      message: "user created successfully",
      user: _.pick(user, ["_id", "username", "email", "role", "createdAt"]),
    });
};
const delUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndRemove(id).select({ password: 0 });
  if (!user) return res.status(400).json({ success: false, message: "user not found" });

  res.status(200).json({ success: true, message: "User deleted successfully", user });
};

module.exports = { getAllUsers, addUser, delUser };
