const router = require("express").Router();
const lang = require("../middleware/language");
const { getAllNews, getOneNews, addNews, updNews, delNews } = require("../controllers/news.controller");

router.route("/").get(lang, getAllNews).post(addNews);
router.route("/:id").get(lang, getOneNews).patch(updNews).delete(delNews);

module.exports = router;
