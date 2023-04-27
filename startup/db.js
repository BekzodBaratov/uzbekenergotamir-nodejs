const mongoose = require("mongoose");

module.exports = async function () {
  await mongoose.connect(process.env.DB);
  console.log("DB connection established");
};
