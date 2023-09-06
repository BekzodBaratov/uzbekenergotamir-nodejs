const { Product, validation, validationUpd } = require("../models/products.model");
const { uploadImg, deleteImg, removeTmp } = require("../helpers/upload");

const getAllProducts = async (req, res) => {
  const products = await Product.find().select(`title_${req.lang} description_${req.lang} image`);
  const productsRes = [];

  products.forEach((product) => {
    const data = {
      _id: product._id,
      title: product.title_uz || product.title_ru || product.title_en,
      description: product.description_uz || product.description_ru || product.description_en,
      image: product.image,
    };
    productsRes.push(data);
  });

  res.status(200).json({ success: true, products: productsRes });
};

const getOneProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).json({ success: false, message: "product not found" });

  res.status(200).json({ success: true, product });
};

const addProducts = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  if (!req.files || !req.files.image) return res.status(400).json({ message: "No image uploaded" });

  const { tempFilePath } = req.files.image;
  const { title_uz, title_ru, title_en, description_uz, description_ru, description_en } = req.body;

  const result = await uploadImg(tempFilePath, "products");
  const product = await Product.create({
    title_uz,
    title_ru,
    title_en,
    description_uz,
    description_ru,
    description_en,
    image: { secure_url: result.secure_url, public_id: result.public_id },
  });
  res.status(200).json({ success: true, product });
};
const updProducts = async (req, res) => {
  const { error } = validationUpd(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found!" });

  if (req.files) {
    await deleteImg(product.image.public_id);
    const { tempFilePath } = req.files.image;
    const result = await uploadImg(tempFilePath, "local_products");

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: { secure_url: result.secure_url, public_id: result.public_id } },
      { new: true }
    );
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ success: true, product });
};
const delProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  await deleteImg(product.image.public_id);
  await Product.findByIdAndRemove(req.params.id);
  res.status(200).json({ success: true });
};

module.exports = { getAllProducts, getOneProducts, addProducts, updProducts, delProducts };
