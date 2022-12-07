const  {register, login, getallusers, getsingleuser}  = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.get("/getallusers", getallusers)
router.get("/getsingleuser/:id", getsingleuser)


module.exports = router