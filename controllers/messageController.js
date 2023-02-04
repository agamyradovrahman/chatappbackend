const Messages = require("../models/messageModel");


exports.addMessage = async (req, res, next) => {
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
};      

exports.addMessages = async (req, res, next) => {
  try {
    const { from, too, message } = req.body;
    const data = await Messages.create({ 
      message: message,
      to: too,
      sender: from, 
      users: [from ,too]    
    });

    if (data) return res.json({ msg: "Message added successfully." });
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
    const {user1, user2} = req.body
    const messages = await Messages.find({
      from: {$in: [user1 || user2]},
      to: {$in: [user1 || user2]},
    })

    return res.json(messages) 
  } catch (err) {
    next(err) 
  }
}