const router = require("express").Router();
const lang = require("../middleware/language");
const {
  getAllEnergyProducts,
  getOneEnergyProducts,
  addEnergyProducts,
  updEnergyProducts,
  delEnergyProducts,
} = require("../controllers/energyProducts.controller");

router.route("/").get(lang, getAllEnergyProducts).post(addEnergyProducts);
router.route("/:id").get(lang, getOneEnergyProducts).patch(updEnergyProducts).delete(delEnergyProducts);

module.exports = router;
