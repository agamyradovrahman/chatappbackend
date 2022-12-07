const Messages = require("../models/messageModel");


exports.addMessage = async (req, res, next) => {
  try {
    const { from, conversation, message } = req.body;
    const data = await Messages.create({
      message: message,
      conversation: conversation,
      sender: from,
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