const Messages = require("../models/messageModel");


/* exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: message,
      to: to,
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};      */

exports.addMessages = async (req, res, next) => {
  try {
    const { from, too, message } = req.body;
    const data = await Messages.create({ 
      message: message,
      to: too,
      sender: from,  
      users: [from ,too]    
    });

    if (data) return res.json(data);
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  } 
}; 

exports.getallmessages = async (req,res,next) => {
  try {
    const data = await Messages.find({})
    return res.json(data)
  } catch (err) {
    next(err);
  }
} 
  
exports.getsinglemessage = async (req,res,next) => { 
  try {
    const messages = await Messages.find({
      users: {$all: [req.params.firstId, req.params.secondId]},
    })

    return res.json(messages)  
  } catch (err) {
    next(err) 
  }
}


exports.deletemesg = async (req,res,next) => {
  try {
    const {msgid} = req.body

    const message = Messages.findById({id: msgid})

    if(!message) {
      return res.json({msg: "There is no message", status: false})
    }

    await Messages.findByIdAndDelete(message)

    return res.json({msg: "message deleted", status: true})

  } catch (error) {
    next(error)
  }
}