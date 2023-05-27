const { Calculate, validation, validationUpd } = require("../models/calculates.model");

const getAllCalculates = async (req, res) => {
  const calculates = await Calculate.find().select("-__v");
  res.status(200).json({ success: true, calculates });
};
const getOneCalculate = async (req, res) => {
  const calculate = await Calculate.findById(req.params.id);
  if (!calculate) return res.status(404).json({ success: false, message: "Calculate not found!" });
  res.status(200).json({ success: true, calculate });
};
const addCalculate = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const { name, phone, sendPlace, recivePlace, service, loadWeight } = req.body;
  const calculate = Calculate.create({ name, phone, sendPlace, recivePlace, service, loadWeight });
  res.status(201).json({ success: true, calculate });
};
const updCalculate = async (req, res) => {
  const { error } = validationUpd(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const calculate = Calculate.findByIdAndUpdate(req.params.id, req.body);
  if (!calculate) return res.status(404).json({ success: false, message: "Calculate not found!" });
  res.status(201).json({ success: true, calculate });
};
const delCalculate = async (req, res) => {
  const calculate = await Calculate.findByIdAndRemove(req.params.id);
  if (!calculate) return res.status(404).json({ success: false, message: "Calculate not found!" });

  res.status(201).json({ success: true, message: "calculate success deleted" });
};

module.exports = { getAllCalculates, getOneCalculate, addCalculate, updCalculate, delCalculate };
