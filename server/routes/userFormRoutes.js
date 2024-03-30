const express = require("express");
const UserFormController = require("../controllers/userFormController");

const router = express.Router();
router.use(express.json());

router.post("/create", UserFormController.userFormCreate);

router.get("/detail", UserFormController.UserFormDetail);

module.exports = router;
