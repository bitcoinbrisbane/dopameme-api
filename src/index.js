const express = require("express");
const Chats = require("./models/chat");
const Coins = require("./models/coin");
const Profile = require("./models/profile");

const app = express();

app.get("/", (req, res) => {
  res.send("dopeameme!");
});

// get chat for a specific coin
app.get("/chat/:coin", async (req, res) => {
  const coin = req.params.coin;
  const chats = await Chats.find({ coin });
  res.json(chats);
});

// create a new chat for a specific coin
app.post("/chat/:coin", async (req, res) => {
  // check signature

  const coin = req.params.coin;
  const { message } = req.body;
  const chat = new Chats({ coin, message });
  await chat.save();
  res.json(chat);
});

app.get("/coins/", async (req, res) => {
  const coins = await Coins.find();
  res.json(coins);
});

app.get("/coin/:address", async (req, res) => {
  const address = req.params.address;
  const coins = await Coins.find({ address });
  res.json(coins);
});

app.get("/profile/:address", async (req, res) => {
  const address = req.params.address;
  const profile = await Profile.findOne({ address });
  res.json(profile);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
