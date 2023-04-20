const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("dotenv").config()

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
    minlength: [3, "Please enter a username atleast 3 characters"],
    maxlength: [15, "Username can not big than 15 characters"],
    unique: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email"],
    required: [true, "Please enter your email"],
    unique: true
  }, 
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [3, "Password should be greater than 3 characters"],
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/dw51bz9id/image/upload/v1681431626/ka2ghfx3osg6rseopmxf.png"
},
},  
{ 
  timestamps: true,
});

const privkeyy = process.env.JWT_SECRET_KEY

userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this.id}, "87a57f23dec38d4c591206ab8686d2c93fe876243a98c39cc6aa541744749ed7",{
    expiresIn: process.env.JTW_EXPIRES
  })
};
 
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("Users", userSchema);