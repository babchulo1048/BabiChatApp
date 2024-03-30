const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    text: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
