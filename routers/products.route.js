const router = require("express").Router();
const {
  getAllProducts,
  getOneProducts,
  addProducts,
  updProducts,
  delProducts,
} = require("../controllers/products.controller");

router.route("/").get(getAllProducts).post(addProducts);
router.route("/:id").get(getOneProducts).patch(updProducts).delete(delProducts);

module.exports = router;
