const { addMessage, getallmessages, addMessages, getsinglemessage } = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/authen");
const router = require("express").Router();


router.route("/addmsgs/").post(isAuthenticatedUser, addMessage);
router.route("/getmsgs/").get(getallmessages);
router.route("/getmsgs/").get(getallmessages);
router.route("/getmsg/:firstId/:secondId").post(isAuthenticatedUser, getsinglemessage);

module.exports = router; 