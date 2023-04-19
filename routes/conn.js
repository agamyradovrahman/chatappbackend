const { addCon, getconuser, selectedcon, deletecon } = require("../controllers/conController");
const router = require("express").Router();

router.route("/addcon/").post(addCon);
router.route("/delcon/").post(deletecon);
router.route("/:userId").get(getconuser)
router.route("/:firstId/:secondId").get(selectedcon)

module.exports = router;  

 