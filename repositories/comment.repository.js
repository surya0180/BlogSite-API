const Comment = require("../models/comment.model");

const getComments = async (postId) => {
    return await Comment.find({ postId });
};

const addComment = async (postId, userId, author, text, commented_date) => {
    const comment = new Comment({
        postId,
        userId,
        author,
        text,
        commented_date,
    });
    return await comment.save();
};

const editComment = async (commentId, text) => {
    return await Comment.updateOne(
        { _id: commentId },
        {
            $set: {
                text,
            },
        }
    );
};

const deleteComment = async (commentId) => {
    return await Comment.updateOne(
        { _id: commentId },
        {
            $set: {
                is_active: false,
            },
        }
    );
};

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment,
};
