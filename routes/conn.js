const { addCon, getconuser, selectedcon } = require("../controllers/conController");
const router = require("express").Router();

router.route("/addcon/").post(addCon);
router.route("/:userId").get(getconuser)
router.route("/:firstId/:secondId").get(selectedcon)

module.exports = router;  