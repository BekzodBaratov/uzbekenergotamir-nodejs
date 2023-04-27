const { model, Schema } = require("mongoose");

const schema = new Schema({ image: { type: String, required: true } });

const Partner = model("partners", schema);

module.exports = { Partner };
