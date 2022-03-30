// Libraries
const express = require("express");

// Middlewares
const authMiddleware = require("../../../middlewares/auth.middleware");

// Controllers
const userController = require("../../../controllers/v1/user.controller");

const router = express.Router();
router.get("/user", authMiddleware, userController.getUser);
router.get("/:user_id", authMiddleware, userController.getUserById);

module.exports = router;
