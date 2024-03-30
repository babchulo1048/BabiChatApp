const error = require("../middleware/error");
const express = require("express");

const UserRoute = require("./userRoutes");
const UserFormRoute = require("./userFormRoutes");
const ConversationRoutes = require("./converastionRoutes");
const messageRoutes = require("./messageRoute");

const router = express.Router();
router.use(express.json());

router.use("/user", UserRoute);
router.use("/userForm", UserFormRoute);
router.use("/conversation", ConversationRoutes);
router.use("/msg", messageRoutes);

router.use(error);

module.exports = router;
