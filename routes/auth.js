const  {register, login, getallusers, getsingleuser, logoutUser, singleuser}  = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logoutUser)
router.get("/getallusers", getallusers)
router.get("/getsingleuser/:id", getsingleuser)
router.get("/singleuser/:username", singleuser)



module.exports = router