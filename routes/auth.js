const  {register, login, getallusers, getsingleuser, logoutUser, singleuser, Rename, Uploadavatar}  = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logoutUser)
router.get("/getallusers", getallusers)
router.get("/getsingleuser/:id", getsingleuser)
router.get("/singleuser/:username", singleuser)
router.put("/user/rename",Rename)
router.put("/user/uploadavatar",Uploadavatar)



module.exports = router