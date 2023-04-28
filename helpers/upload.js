const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

exports.uploadImg = async (imgPath, folderPath) => {
  if (!folderPath) return console.log("folderPath not found");

  try {
    const result = await cloudinary.uploader.upload(imgPath, { folder: `Uzbekenergotamir/${folderPath}` });
    removeTmp(imgPath);
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteImg = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
  return "file deleted";
};
