const  {register, login, getallusers, getsingleuser, logoutUser}  = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logoutUser)
router.get("/getallusers", getallusers)
router.get("/getsingleuser/:id", getsingleuser)



module.exports = router