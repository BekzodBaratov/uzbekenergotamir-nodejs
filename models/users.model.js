const { Schema, model } = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = new Schema(
  {
    username: { type: String, minLength: 3, maxLength: 32, required: true },
    email: { type: String, unique: true, minLength: 5, maxLength: 32, required: true },
    password: { type: String, minLength: 4, maxLength: 100, required: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
  },
  { timestamps: true }
);
schema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET_KEY);
};
const User = model("users", schema);

const validation = (user) => {
  return Joi.object({
    username: Joi.string().min(3).max(32).required(),
    email: Joi.string().email().min(5).max(32).required(),
    password: Joi.string().min(4).max(100).required(),
  }).validate(user);
};

module.exports = { User, validation };
