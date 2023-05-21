const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getAllPartners,
  getOnePartner,
  addPartner,
  updPartner,
  delPartner,
} = require("../controllers/partners.controller");

router.route("/").get(getAllPartners).post(auth, addPartner);
router.route("/:id").get(getOnePartner).patch(auth, updPartner).delete(auth, delPartner);

module.exports = router;
