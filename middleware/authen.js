const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.json("Please login for acces this resource")
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        console.log(error)  
    }
}