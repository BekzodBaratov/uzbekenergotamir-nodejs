const { Contact, validation, validationUpd } = require("../models/contacts.model");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ success: true, contacts });
};
const getOneContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ success: false, message: "Contact not found!" });
  res.status(200).json({ success: true, contact });
};
const addContact = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const { name, phone, sendPlace, recivePlace, service, loadWeight } = req.body;
  const contact = Contact.create({ name, phone, sendPlace, recivePlace, service, loadWeight });
  res.status(201).json({ success: true, contact });
};
const updContact = async (req, res) => {
  const { error } = validationUpd(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const contact = Contact.findByIdAndUpdate(req.params.id, req.body);
  if (!contact) return res.status(404).json({ success: false, message: "Contact not found!" });
  res.status(201).json({ success: true, contact });
};
const delContact = async (req, res) => {
  await Contact.findByIdAndRemove(req.params.id);
  res.status(201).json({ success: true, message: "contact success deleted" });
};

module.exports = { getAllContacts, getOneContact, addContact, updContact, delContact };
