// Mongoose model for chat
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  coin: {
    type: String,
    required: true,
  },
  // timestamp: {
  //   type: Date,
  //   default: Date.now,
  // }
});

module.exports = mongoose.model("Chat", chatSchema);
