const asyncMiddleware = require("../middleware/async");
const Message = require("../models/Message");

exports.MessageCreate = asyncMiddleware(async (req, res) => {
  //   const { conversationId, sender, text } = req.body;

  const message = new Message(req.body);
  await message.save();

  res.status(200).send(message);
});

exports.SpecificMessages = asyncMiddleware(async (req, res) => {
  const { conversationId } = req.params;

  const message = await Message.find({ conversationId });

  res.send(message);
});
