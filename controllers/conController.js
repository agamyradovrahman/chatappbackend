const Con = require("../models/conModels")
const User = require("../models/userModel");

exports.addCon = async (req,res,next) => {
  try {
    const {user1, user2} = req.body
    const user = await User.findOne({username: user2})
    
    if(!user){
      return res.json({msg: "User is not exist", status: false})
    }
  
    const con1 = await Con.findOne({users: [user1, user._id]})
    if(con1){
        return res.json({msg: "Conversation is already exist", status: false})

    }

    const con = await Con.create({ 
        users: [user1, user._id]
    })
    return res.json(user)
  } catch (err) { 
    next(err)
  }
}

exports.getconuser = async (req,res,next) => {
  try {
    const con = await Con.find({
      users: {$in: [req.params.userId]}
    })

    return res.json(con) 
  } catch (err) {
    next(err)
  }
}

exports.selectedcon = async (req,res,next) => {
  try {
    const {user1, user2} = req.body
    const con =await Con.findOne({
      users: {$all: [req.params.firstId, req.params.secondId]}
    })

    res.json(con)
  } catch (err) {
    next(err)
  }
}