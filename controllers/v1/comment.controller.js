const commentService = require("../../services/comment.service");

const getComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (postId !== undefined) {
            const response = await commentService.getComments(postId);
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
            errors: {},
        });
    }
};
const addComment = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.postId !== undefined &&
            req.user.id !== undefined &&
            body.text !== undefined
        ) {
            const response = await commentService.addComment(
                body.postId,
                req.user.id,
                body.text
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
            errors: {},
        });
    }
};
const editComment = async (req, res) => {
    try {
        const body = req.body;
        if (body.commentId !== undefined && body.text !== undefined) {
            const response = await commentService.editComment(
                body.commentId,
                body.text
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
            errors: {},
        });
    }
};
const deleteComment = async (req, res) => {
    try {
        const body = req.body;
        if (body.commentId !== undefined) {
            const response = await commentService.deleteComment(body.commentId);
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
            errors: {},
        });
    }
};

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment,
};
