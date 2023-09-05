const { News, validation, validationUpd } = require("../models/news.model");
const { uploadImg, deleteImg } = require("../helpers/upload");

const getAllNews = async (req, res) => {
  const news = await News.find().select(`title_${req.lang} description_${req.lang} image category path`);
  const newsRes = [];

  news.forEach((newsOne) => {
    const data = {
      _id: newsOne._id,
      category: newsOne.category,
      title: newsOne.title_uz || newsOne.title_ru || newsOne.title_en,
      description: newsOne.description_uz || newsOne.description_ru || newsOne.description_en,
      image: newsOne.image,
      path: newsOne.path,
    };
    newsRes.push(data);
  });

  res.status(200).json({ success: true, news: newsRes });
};

const getOneNews = async (req, res) => {
  const newsOne = await News.findById(req.params.id);
  if (!newsOne) return res.status(400).json({ success: false, message: "news not found" });

  res.status(200).json({ success: true, newsOne });
};

const addNews = async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  if (!req.files || !req.files.image) return res.status(400).json({ message: "No image uploaded" });

  const { tempFilePath } = req.files.image;
  const { title_uz, title_ru, title_en, description_uz, description_ru, description_en, category, path } = req.body;

  const result = await uploadImg(tempFilePath, "news");
  const newsOne = await News.create({
    category,
    title_uz,
    title_ru,
    title_en,
    description_uz,
    description_ru,
    description_en,
    path,
    image: { secure_url: result.secure_url, public_id: result.public_id },
  });
  res.status(200).json({ success: true, newsOne });
};
const updNews = async (req, res) => {
  const { error } = validationUpd(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const newsOne = await News.findById(req.params.id);
  if (!newsOne) return res.status(404).json({ success: false, message: "News not found!" });

  if (!req.files || !req.files.image) {
    await deleteImg(newsOne.image.public_id);
    const { tempFilePath } = req.files.image;
    const result = await uploadImg(tempFilePath);

    newsOne = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: { secure_url: result.secure_url, public_id: result.public_id } },
      { new: true }
    );
  }
  newsOne = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ success: true, newsOne });
};
const delNews = async (req, res) => {
  const newsOne = await News.findById(req.params.id);
  await deleteImg(newsOne.image.public_id);
  await News.findByIdAndRemove(req.params.id);
  res.status(200).json({ success: true });
};

module.exports = { getAllNews, getOneNews, addNews, updNews, delNews };
