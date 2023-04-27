const router = require("express").Router();
const {
  getAllCalculates,
  getOneCalculate,
  addCalculate,
  updCalculate,
  delCalculate,
} = require("../controllers/calculates.controller");

router.route("/").get(getAllCalculates).post(addCalculate);
router.route("/:id").get(getOneCalculate).patch(updCalculate).delete(delCalculate);

module.exports = router;
