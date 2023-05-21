const router = require("express").Router();
const lang = require("../middleware/language");
const auth = require("../middleware/auth");
const {
  getAllEnergyProducts,
  getOneEnergyProducts,
  addEnergyProducts,
  updEnergyProducts,
  delEnergyProducts,
} = require("../controllers/energyProducts.controller");

router.route("/").get(lang, getAllEnergyProducts).post(auth, addEnergyProducts);
router.route("/:id").get(lang, getOneEnergyProducts).patch(auth, updEnergyProducts).delete(auth, delEnergyProducts);

module.exports = router;
