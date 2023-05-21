const router = require("express").Router();
const { getAllUsers, addUser, delUser } = require("../controllers/users.controller");
const auth = require("../middleware/auth");
const superadmin = require("../middleware/superadmin");

router.route("/").get(auth, getAllUsers).post(addUser);
router.route("/:id").delete([auth, superadmin], delUser);

module.exports = router;
