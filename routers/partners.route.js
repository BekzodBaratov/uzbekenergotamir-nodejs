const router = require("express").Router();
const {
  getAllPartners,
  getOnePartner,
  addPartner,
  updPartner,
  delPartner,
} = require("../controllers/partners.controller");

router.route("/").get(getAllPartners).post(addPartner);
router.route("/:id").get(getOnePartner).patch(updPartner).delete(delPartner);

module.exports = router;
