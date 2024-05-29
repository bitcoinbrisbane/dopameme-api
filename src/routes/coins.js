// add router for coins
const express = require("express");
const router = express.Router();

const Coins = require("../models/coin");

/**
 * @swagger
 * /coins/:
 *   get:
 *     description:  Get all coins
 */
router.get("/", async (req, res) => {
  const coins = await Coins.find();
  res.json(coins);
});

/**
 * @swagger
 * /coins/next/{address}:
 *   get:
 *     description:  Get the next suggested coin for that user
 */
router.get("/next/:address", async (req, res) => {
  const coins = await Coins.find();

  // get a random coin
  const randomIndex = Math.floor(Math.random() * coins.length);
  const randomCoin = coins[randomIndex];

  res.json(randomCoin);
});

/**
 * @swagger
 * /coins/next/{address}:
 *   post:
 *     description:  Set if the user likes the coin
 */
router.post("/next/:address", async (req, res) => {
  const coins = await Coins.find();

  // get a random coin
  const randomIndex = Math.floor(Math.random() * coins.length);
  const randomCoin = coins[randomIndex];

  res.json(randomCoin);
});

router.get("/:address", async (req, res) => {
  const address = req.params.address;
  const coin = await Coins.findOne({ address });

  res.json(coin);
});

router.get("/hodlers/:address", async (req, res) => {
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

router.get("/updates/:address", async (req, res) => {
  const updates = [
    {
      update: "Lipsum dolor sit amet",
      date: date.now(),
    },
    {
      update: "Lipsum dolor sit amet",
      date: date.now(),
    },
  ];

  return res.json(updates);
});

module.exports = router;
