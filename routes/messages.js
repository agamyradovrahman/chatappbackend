const { addMessage, getallmessages } = require("../controllers/messageController");
const router = require("express").Router();

router.route("/addmsg/").post(addMessage);
router.route("/getmsgs/").get(getallmessages);

module.exports = router;