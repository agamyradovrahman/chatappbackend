const { addMessage, getallmessages } = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/authen");
const router = require("express").Router();


router.route("/addmsgs/").post(isAuthenticatedUser, addMessage);
router.route("/getmsgs/").get(getallmessages);

module.exports = router;