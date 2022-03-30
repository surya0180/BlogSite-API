// Libraries
const express = require("express");

// Middlewares
const authMiddleware = require("../../../middlewares/auth.middleware");

// Controllers
const userController = require("../../../controllers/v1/user.controller");

const router = express.Router();
router.get("/get_user", authMiddleware, userController.getUser);
router.get("/get_user/:user_id", authMiddleware, userController.getUserById);
router.post("/update_user", authMiddleware, userController.updateUser);
router.post("/follow_user", authMiddleware, userController.followUser);
router.post("/unfollow_user", authMiddleware, userController.unfollowUser);

module.exports = router;
