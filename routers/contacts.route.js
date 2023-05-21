const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getAllContacts,
  getOneContact,
  addContact,
  updContact,
  delContact,
} = require("../controllers/contacts.controller");

router.route("/").get(auth, getAllContacts).post(addContact);
router.route("/:id").get(auth, getOneContact).patch(auth, updContact).delete(auth, delContact);

module.exports = router;
