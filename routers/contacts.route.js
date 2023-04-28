const router = require("express").Router();
const {
  getAllContacts,
  getOneContact,
  addContact,
  updContact,
  delContact,
} = require("../controllers/contacts.controller");

router.route("/").get(getAllContacts).post(addContact);
router.route("/:id").get(getOneContact).patch(updContact).delete(delContact);

module.exports = router;
