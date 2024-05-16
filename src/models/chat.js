// Mongoose model for chat
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
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
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Chat = mongoose.model("Chat", chatSchema);
