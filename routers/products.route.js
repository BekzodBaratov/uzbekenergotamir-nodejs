const router = require("express").Router();
const lang = require("../middleware/language");
const {
  getAllProducts,
  getOneProducts,
  addProducts,
  updProducts,
  delProducts,
} = require("../controllers/products.controller");

router.route("/").get(lang, getAllProducts).post(addProducts);
router.route("/:id").get(lang, getOneProducts).patch(updProducts).delete(delProducts);

module.exports = router;
