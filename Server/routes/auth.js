const express = require("express");
const AuthController = require("../controllers/userController");
const addUserValidation = require("../validation/user.validation");
const router = express.Router();
router.post("/signup", addUserValidation, AuthController.createUser);
router.post("/login", AuthController.loginUser);
router.get("/", AuthController.getAllUser);
module.exports = router;
