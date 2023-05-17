const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  category: { type: String, default: "otherNews", enum: ["otherNews", "uzbekenergo"], required: true },
  title_uz: { type: String, maxLength: 255, required: true },
  title_ru: { type: String, maxLength: 255, required: true },
  title_en: { type: String, maxLength: 255, required: true },
  description_uz: { type: String, maxLength: 1023, required: true },
  description_ru: { type: String, maxLength: 1023, required: true },
  description_en: { type: String, maxLength: 1023, required: true },
  image: { type: Object, required: true },
});

const News = model("news", schema);

const validation = function (news) {
  return Joi.object({
    category: Joi.string().max(255).valid("otherNews", "uzbekenergo").required(),
    title_uz: Joi.string().max(255).required(),
    title_ru: Joi.string().max(255).required(),
    title_en: Joi.string().max(255).required(),
    description_uz: Joi.string().max(1023).required(),
    description_ru: Joi.string().max(1023).required(),
    description_en: Joi.string().max(1023).required(),
  }).validate(news);
};

const validationUpd = function (news) {
  return Joi.object({
    category: Joi.string().max(255).valid("otherNews", "uzbekenergo"),
    title_uz: Joi.string().max(255),
    title_ru: Joi.string().max(255),
    title_en: Joi.string().max(255),
    description_uz: Joi.string().max(1023),
    description_ru: Joi.string().max(1023),
    description_en: Joi.string().max(1023),
  }).validate(news);
};

module.exports = { News, validation, validationUpd };
