const router = require("express").Router();
const { EnergyProduct } = require("../models/energyProducts.model");
const { News } = require("../models/news.model");
const { Partner } = require("../models/partners.model");
const { Product } = require("../models/products.model");

router.get("/", async function (req, res) {
  const energy_products = await EnergyProduct.find();
  const news = await News.find();
  const partners = await Partner.find();
  const products = await Product.find();

  res.status(200).json({
    success: true,
    data: {
      energy_products,
      news,
      partners,
      products,
    },
  });
});

module.exports = router;
