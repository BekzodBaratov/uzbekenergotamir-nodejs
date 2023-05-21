const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getAllCalculates,
  getOneCalculate,
  addCalculate,
  updCalculate,
  delCalculate,
} = require("../controllers/calculates.controller");

router.route("/").get(auth, getAllCalculates).post(addCalculate);
router.route("/:id").get(auth, getOneCalculate).patch(auth, updCalculate).delete(auth, delCalculate);

module.exports = router;
