const { addMessage, getallmessages, addMessages, getsinglemessage } = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/authen");
const router = require("express").Router();


router.route("/addmsgs/").post(addMessages);
router.route("/getmsgs/").get(getallmessages);
router.route("/getmsgs/").get(getallmessages);
router.route("/getsinglemsg/").get(getsinglemessage);

module.exports = router; 