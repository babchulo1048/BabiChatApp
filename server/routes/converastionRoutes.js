const express = require("express");
const conversationController = require("../controllers/conversationController");
const router = express.Router();
router.use(express.json());

router.post("/create", conversationController.ConversationCreate);

router.get("/detail/:id", conversationController.SpecificConversation);

module.exports = router;
