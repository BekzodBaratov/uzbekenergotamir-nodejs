const router = require("express").Router();
const lang = require("../middleware/language");
const auth = require("../middleware/auth");
const { getAllNews, getOneNews, addNews, updNews, delNews } = require("../controllers/news.controller");

router.route("/").get(lang, getAllNews).post(auth, addNews);
router.route("/:id").get(lang, getOneNews).patch(auth, updNews).delete(auth, delNews);

module.exports = router;
