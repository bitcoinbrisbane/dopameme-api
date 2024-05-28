const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

/**
 * @swagger
 * /chat/{coin}:
 *  get:
 *   summary: Get chat for a specific coin
 *  parameters:
 *   - in: path
 *    name: coin
 *   required: true
 *  schema:
 *   type: string
 * responses:
 * 200:
 * description: A successful response
 * content:
 * application/json:
 */
router.get("/:coin", async (req, res) => {
  const coin = req.params.coin;
  const chats = await Chat.find({ coin });

  // order by timestamp desc
  chats.sort((a, b) => b.timestamp - a.timestamp);

  res.json(chats);
});

// create a new chat for a specific coin
router.post("/:coin", async (req, res) => {
  // check signature

  const coin = req.params.coin;
  const { message, user } = req.body;
  const chat = await new Chat({ user, message, coin });
  await chat.save();
  res.json(chat);
});

module.exports = router;
