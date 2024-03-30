const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
router.use(express.json());

router.post("/register", userController.userRegister);

router.get("/detail/:id", userController.userDetail);

router.post("/login", userController.userLogin);

module.exports = router;
