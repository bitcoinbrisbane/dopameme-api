const express = require("express");
const swagger = require("./swagger");
const Chat = require("./models/chat");
const Coins = require("./models/coin");
const Profile = require("./models/profile");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/dbConfig");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

swagger(app);

const check_signature = process.env.CHECK_SIGNATURE || false;

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get("/", (req, res) => {
  res.send("dopeameme!");
});

// get chat for a specific coin
app.get("/chat/:coin", async (req, res) => {
  const coin = req.params.coin;
  const chats = await Chat.find({ coin });

  // order by timestamp desc
  chats.sort((a, b) => b.timestamp - a.timestamp);

  res.json(chats);
});

// create a new chat for a specific coin
app.post("/chat/:coin", async (req, res) => {
  // check signature

  const coin = req.params.coin;
  const { message, user } = req.body;
  const chat = await new Chat({ user, message, coin });
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

app.get("/coin/hodlers/:address", async (req, res) => {
  const wallets = [
    {
      address: "0x1234",
      amount: 100,
    },
    {
      address: "0x5678",
      amount: 200,
    },
  ];

  return res.json(wallets);
});

app.get("/profile/:address", async (req, res) => {
  const address = req.params.address;
  const profile = await Profile.findOne({ address });
  res.json(profile);
});

app.post("/profile/", async (req, res) => {
  const { name, address } = req.body;

  const profile = Profile.create({ address, name, bio });
  // await profile.save();

  res.status(201).json(profile);
});

// app.put("/profile/:address", async (req, res) => {
//   const address = req.params.address;
//   const { name, bio } = req.body;
//   const profile = await Profile
//     .findOneAndUpdate({ address }, { name, bio }, { upsert: true, new: true });
//   res.json(profile);
// });

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  app.listen(PORT, async () => {
    console.log(`Dope server running on port ${PORT}`);
  });
});
