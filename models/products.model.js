const { model, Schema } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Object, required: true },
});

const Product = model("products", schema);

const validation = function (product) {
  return Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).validate(product);
};
const validationUpd = function (product) {
  return Joi.object({
    title: Joi.string(),
    description: Joi.string(),
  }).validate(product);
};

module.exports = { Product, validation, validationUpd };
