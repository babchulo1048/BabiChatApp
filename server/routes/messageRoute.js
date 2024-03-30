const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();
router.use(express.json());

router.post("/create", messageController.MessageCreate);

router.get("/detail/:conversationId", messageController.SpecificMessages);

module.exports = router;
