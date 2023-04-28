const { model, Schema } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = model("contacts", schema);

const validation = function (contact) {
  return Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    message: Joi.string().required(),
  }).validate(contact);
};
const validationUpd = function (contact) {
  return Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    message: Joi.string(),
  }).validate(contact);
};

module.exports = { Contact, validation, validationUpd };
