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

// Routes
const chat = require("./routes/chat");

swagger(app);

const check_signature = process.env.CHECK_SIGNATURE || false;

// Routes
app.use("/chat", chat);

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

app.get("/coins/", async (req, res) => {
  const coins = await Coins.find();
  res.json(coins);
});

app.get("/coins/:address", async (req, res) => {
  const address = req.params.address;
  const coin = await Coins.findOne({ address });

  res.json(coin);
});

app.get("/coins/hodlers/:address", async (req, res) => {
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
  const { username, address, bio } = req.body;

  const profile = Profile.create({ address, username, bio });
  // await profile.save();

  res.status(201).json(profile);
});

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  app.listen(PORT, async () => {
    console.log(`Dope server running on port ${PORT}`);
  });
});
