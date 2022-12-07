const { addCon } = require("../controllers/conController");
const router = require("express").Router();

router.route("/addcon/").post(addCon);

module.exports = router;