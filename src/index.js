const express = require("express");
const swagger = require("./swagger");

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


// Routes
app.use("/chat", chat);
app.use("/coins", require("./routes/coins"));

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
