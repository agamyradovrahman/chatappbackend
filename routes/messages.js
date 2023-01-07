const { addMessage, getallmessages, addMessages } = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/authen");
const router = require("express").Router();


router.route("/addmsgs/").post(isAuthenticatedUser, addMessage);
router.route("/getmsgs/").get(getallmessages);
router.route("/addms/").post(isAuthenticatedUser, addMessages);

module.exports = router;