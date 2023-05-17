module.exports = function (req, res, next) {
  let lang = req.header("Accept-language");
  if (!lang) lang = "ru";
  req.lang = lang;
  next();
};
