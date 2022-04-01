const commentService = require("../../services/comment.service");

const getComments = async (req, res) => {
    try {
        const body = req.body;
        if (body.postId !== undefined) {
            const response = await commentService.getComments();
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
            body.userId !== undefined &&
            body.text !== undefined
        ) {
            const response = await commentService.addComment(
                body.postId,
                body.userId,
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
