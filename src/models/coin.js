// Mongoose model for coin
const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

const Coin = mongoose.model("Coin", coinSchema);
