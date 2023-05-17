const { EnergyProduct, validation, validationUpd } = require("../models/energyProducts.model");
const { uploadImg, deleteImg } = require("../helpers/upload");

const getAllEnergyProducts = async (req, res) => {
  const search = req.query.search ? { category: req.query.search } : undefined;
  const energyProducts = await EnergyProduct.find(search).select(
    `title_${req.lang} description_${req.lang} images category`
  );
  const energyProductRes = [];

  energyProducts.forEach((energyProduct) => {
    const data = {
      _id: energyProduct._id,
      category: energyProduct.category,
      title: energyProduct.title_uz || energyProduct.title_ru || energyProduct.title_en,
      description: energyProduct.description_uz || energyProduct.description_ru || energyProduct.description_en,
      images: energyProduct.images,
    };
    energyProductRes.push(data);
  });

  res.status(200).json({ success: true, energyProducts: energyProductRes });
};

const getOneEnergyProducts = async (req, res) => {
  const energyProduct = await EnergyProduct.findById(req.params.id).select(
    `title_${req.lang} description_${req.lang} images category`
  );
  if (!energyProduct) return res.status(400).json({ success: false, message: "energyProducts not found" });
  let energyProductRes = [];

  const data = {
    _id: energyProduct._id,
    category: energyProduct.category,
    title: energyProduct.title_uz || energyProduct.title_ru || energyProduct.title_en,
    description: energyProduct.description_uz || energyProduct.description_ru || energyProduct.description_en,
    images: energyProduct.images,
  };
  energyProductRes.push(data);
  res.status(200).json({ success: true, energyProduct: energyProductRes });
};

const addEnergyProducts = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  if (!req.files)
    return res.status(400).json({ success: false, message: "Iltimos, Yuklanishi kerak bo'lgan rasmlarni tanlang" });
  if (req.files.images.length < 2 || req.files.images.length > 5)
    return res.status(400).json({
      success: false,
      message: "Yuklanishi kerak bo'lgan rasmlar soni 2 va undan yuqori 4 va undan kam bo'lishi kerak.",
    });

  const images = req.files.images;
  const { title_uz, title_ru, title_en, description_uz, description_ru, description_en, category } = req.body;

  console.log(req.files);
  const imagesUpl = [];
  for (let i = 0; i < images.length; i++) {
    const { tempFilePath } = images[i];
    const result = await uploadImg(tempFilePath, "energyProduct");

    const { secure_url, public_id } = result;
    imagesUpl.push({ secure_url, public_id });
  }

  const energyProduct = await EnergyProduct.create({
    category,
    title_uz,
    title_ru,
    title_en,
    description_uz,
    description_ru,
    description_en,
    images: imagesUpl,
  });
  res.status(200).json({ success: true, energyProduct });
};
const updEnergyProducts = async (req, res) => {
  const { error } = validationUpd(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const energyProduct = await EnergyProduct.findById(req.params.id);
  if (!energyProduct) return res.status(404).json({ success: false, message: "EnergyProduct not found!" });

  if (!req.files || !req.files.images) {
    if (req.files.images.length < 2 || req.files.images.length > 5)
      return res.status(400).json({
        success: false,
        message: "Yuklanishi kerak bo'lgan rasmlar soni 2 va undan yuqori 4 va undan kam bo'lishi kerak.",
      });

    for (let i = 0; i < energyProduct.images.length; i++) {
      await deleteImg(energyProduct.images[i].public_id);
    }
    const images = req.files.images;
    const imagesUpl = [];
    for (let i = 0; i < images.length; i++) {
      const { tempFilePath } = images[i];
      const result = await uploadImg(tempFilePath, "energyProduct");

      const { secure_url, public_id } = result;
      imagesUpl.push({ secure_url, public_id });
    }

    energyProduct = await EnergyProduct.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imagesUpl },
      { new: true }
    );
  }
  energyProduct = await EnergyProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ success: true, energyProduct });
};
const delEnergyProducts = async (req, res) => {
  const energyProduct = await EnergyProduct.findById(req.params.id);
  for (let i = 0; i < energyProduct.images.length; i++) {
    await deleteImg(energyProduct.images[i].public_id);
  }
  await EnergyProduct.findByIdAndRemove(req.params.id);
  res.status(200).json({ success: true });
};

module.exports = {
  getAllEnergyProducts,
  getOneEnergyProducts,
  addEnergyProducts,
  updEnergyProducts,
  delEnergyProducts,
};
