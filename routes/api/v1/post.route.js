const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const postController = require("../../../controllers/v1/post.controller");

const router = express.Router();

router.get("/get_all_posts", postController.getPosts);
router.get("/get_posts", authMiddleware, postController.getPostsByUserId);
router.get(
    "/get_posts_by_userId/:userId",
    postController.getPostsByOtherUserId
);
router.get("/get_post/:postId", postController.getPostByPostId);
router.post("/create_post", authMiddleware, postController.createPost);
router.post("/update_post", authMiddleware, postController.updatePost);
router.delete("/delete_post", authMiddleware, postController.deletePost);

module.exports = router;
