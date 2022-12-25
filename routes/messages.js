const { addMessage, getallmessages } = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/authen");
const router = require("express").Router();


router.route("/addmsg/").post(isAuthenticatedUser, addMessage);
router.route("/getmsgs/").get(getallmessages);

module.exports = router;