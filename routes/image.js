const  { uploadImage } =  require("../controllers/imageController");
const router = require("express").Router();
const multer = require("../middleware/multer");


router.post("/img", multer.single("image"), uploadImage)

module.exports = router;  