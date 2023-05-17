const { model, Schema } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  title_uz: { type: String, required: true },
  title_ru: { type: String, required: true },
  title_en: { type: String, required: true },

  description_uz: { type: String, required: true },
  description_ru: { type: String, required: true },
  description_en: { type: String, required: true },

  image: { type: Object, required: true },
});

const Product = model("products", schema);

const validation = function (product) {
  return Joi.object({
    title_uz: Joi.string().required(),
    title_ru: Joi.string().required(),
    title_en: Joi.string().required(),
    description_uz: Joi.string().required(),
    description_ru: Joi.string().required(),
    description_en: Joi.string().required(),
  }).validate(product);
};
const validationUpd = function (product) {
  return Joi.object({
    title_uz: Joi.string(),
    title_ru: Joi.string(),
    title_en: Joi.string(),
    description_uz: Joi.string(),
    description_ru: Joi.string(),
    description_en: Joi.string(),
  }).validate(product);
};

module.exports = { Product, validation, validationUpd };
