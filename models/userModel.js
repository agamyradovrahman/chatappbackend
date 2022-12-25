const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
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