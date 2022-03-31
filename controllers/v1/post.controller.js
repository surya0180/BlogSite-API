const postService = require("../../services/post.service");

const createPost = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await postService.createPost(
                body.userId,
                body.title,
                body.summary,
                body.genre,
                body.banner,
                body.cells
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.postId !== undefined &&
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await postService.updatePost(
                body.postId,
                body.title,
                body.summary,
                body.genre,
                body.banner,
                body.cells
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const body = req.body;
        if (body.postId !== undefined && body.userId) {
            const response = await postService.deletePost(
                body.postId,
                body.userId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const response = await postService.getPosts();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const getPostsByUserId = async (req, res) => {
    try {
        const body = req.body;
        if (body.userId !== undefined) {
            const response = await postService.getPostsByUserId(body.userId);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const getPostByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (postId !== undefined) {
            const response = await postService.getPostByPostId(postId);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostsByUserId,
    getPostByPostId,
};
