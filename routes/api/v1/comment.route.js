const express = require("express");

const authMiddleware = require("../../../middlewares/auth.middleware");

const commentController = require("../../../controllers/v1/comment.controller");

const router = express.Router();

router.get("/get_comments", commentController.getComments);
router.post("/add_comment", authMiddleware, commentController.addComment);
router.post("/edit_comment", authMiddleware, commentController.editComment);
router.post("/delete_comment", authMiddleware, commentController.deleteComment);

module.exports = router;
