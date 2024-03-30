const asyncMiddleware = require("../middleware/async");
const Conversation = require("../models/Conversation");

exports.ConversationCreate = asyncMiddleware(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const conversation = new Conversation({ members: [senderId, receiverId] });
  await conversation.save();

  res.send(conversation);
});

exports.SpecificConversation = asyncMiddleware(async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.find({ members: { $in: [id] } });

  res.send(conversation);
});
