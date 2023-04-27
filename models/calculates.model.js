const { model, Schema } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  sendPlace: { type: String, required: true },
  recivePlace: { type: String, required: true },
  service: { type: String, required: true },
  loadWeight: { type: Number, required: true },
});

const Calculate = model("calculates", schema);

const validation = function (product) {
  return Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    sendPlace: Joi.string().required(),
    recivePlace: Joi.string().required(),
    service: Joi.string().required(),
    loadWeight: Joi.number().required(),
  }).validate(product);
};
const validationUpd = function (product) {
  return Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    sendPlace: Joi.string(),
    recivePlace: Joi.string(),
    service: Joi.string(),
    loadWeight: Joi.number(),
  }).validate(product);
};

module.exports = { Calculate, validation, validationUpd };
