const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  category: { type: String, enum: ["solarPanel", "waterHeater"], required: true },
  title_uz: { type: String, maxLength: 255, required: true },
  title_ru: { type: String, maxLength: 255, required: true },
  title_en: { type: String, maxLength: 255, required: true },
  description_uz: { type: String, maxLength: 1023, required: true },
  description_ru: { type: String, maxLength: 1023, required: true },
  description_en: { type: String, maxLength: 1023, required: true },
  images: { type: [Object], required: true, validate: (v) => Array.isArray(v) && v.length > 1 && v.length < 5 },
  meta_description: { type: String, maxLength: 1023, required: true },
  meta_keywords: { type: String, maxLength: 1023, required: true },
});

const EnergyProduct = model("energyproducts", schema);

const validation = function (product) {
  return Joi.object({
    category: Joi.string().max(255).valid("solarPanel", "waterHeater").required(),
    title_uz: Joi.string().max(255).required(),
    title_ru: Joi.string().max(255).required(),
    title_en: Joi.string().max(255).required(),
    description_uz: Joi.string().max(1023).required(),
    description_ru: Joi.string().max(1023).required(),
    description_en: Joi.string().max(1023).required(),
    meta_description: Joi.string().max(1023).required(),
    meta_keywords: Joi.string().max(1023).required(),
  }).validate(product);
};

const validationUpd = function (product) {
  return Joi.object({
    category: Joi.string().max(255).valid("solarPanel", "waterHeater"),
    title_uz: Joi.string().max(255),
    title_ru: Joi.string().max(255),
    title_en: Joi.string().max(255),
    description_uz: Joi.string().max(1023),
    description_ru: Joi.string().max(1023),
    description_en: Joi.string().max(1023),
    meta_description: Joi.string().max(1023),
    meta_keywords: Joi.string().max(1023),
  }).validate(product);
};

module.exports = { EnergyProduct, validation, validationUpd };
