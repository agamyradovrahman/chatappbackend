const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

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
  }
},
{ 
  timestamps: true,
});


userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JTW_EXPIRES
  })
};
 
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("Users", userSchema);