const { Partner } = require("../models/partners.model");
const { uploadImg, deleteImg, removeTmp } = require("../helpers/upload");

const getAllPartners = async (req, res) => {
  const partners = await Partner.find().select("-__v");
  res.status(200).json({ success: true, partners });
};
const getOnePartner = async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(400).json({ success: false, message: "partner not found" });
  res.status(200).json({ success: true, partner });
};
const addPartner = async (req, res) => {
  if (!req.files || !req.files.image) return res.status(400).json({ message: "No image uploaded" });
  const { tempFilePath } = req.files.image;
  const result = await uploadImg(tempFilePath, "partners");
  const partner = await Partner.create({ image: { secure_url: result.secure_url, public_id: result.public_id } });
  res.status(200).json({ success: true, partner });
};
const updPartner = async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(404).json({ success: false, message: "Partner not found!" });
  await deleteImg(partner.image.public_id);

  if (!req.files || !req.files.image) return res.status(400).json({ message: "No image uploaded" });
  const { tempFilePath } = req.files.image;
  const result = await uploadImg(tempFilePath);
  partner = await Partner.findByIdAndUpdate(
    req.params.id,
    { image: { secure_url: result.secure_url, public_id: result.public_id } },
    { new: true }
  );
  res.status(200).json({ success: true, partner });
};
const delPartner = async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(404).json({ success: false, message: "Partner not found!" });
  await deleteImg(partner.image.public_id);
  await Partner.findByIdAndRemove(req.params.id);
  res.status(200).json({ success: true });
};

module.exports = { getAllPartners, getOnePartner, addPartner, updPartner, delPartner };
