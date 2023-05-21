const router = require("express").Router();
const { User } = require("../models/users.model");
const { EnergyProduct } = require("../models/energyProducts.model");

module.exports = router.get("/", async (req, res) => {
  const userCount = await User.count();
  const solarPanel = await EnergyProduct.find({ category: "solarPanel" }).count();
  const waterHeater = await EnergyProduct.find({ category: "waterHeater" }).count();

  res.status(200).json({ success: true, data: { userCount, solarPanel, waterHeater } });
});
