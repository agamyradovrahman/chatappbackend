const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    users: Array,
    sender: {
      type: String,
      required: true, 
    },
    to: {
      type: String,

    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
