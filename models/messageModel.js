const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true, 
    },
    users: [
      from, too
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,  
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
