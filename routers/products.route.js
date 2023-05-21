const router = require("express").Router();
const lang = require("../middleware/language");
const auth = require("../middleware/auth");
const {
  getAllProducts,
  getOneProducts,
  addProducts,
  updProducts,
  delProducts,
} = require("../controllers/products.controller");

router.route("/").get(lang, getAllProducts).post(auth, addProducts);
router.route("/:id").get(lang, getOneProducts).patch(auth, updProducts).delete(auth, delProducts);

module.exports = router;
