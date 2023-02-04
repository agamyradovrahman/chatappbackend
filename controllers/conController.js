const Con = require("../models/conModels")

exports.addCon = async (req,res,next) => {
  try {
    const {user1, user2} = req.body
    const con1 = await Con.findOne({users: [user1, user2]})
    if(con1){
        return res.json({msg: "Conversation is already exist", status: false})

    }

    const con = await Con.create({ 
        users: [user1, user2]
    })
    return res.json(con)
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