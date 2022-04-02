const commentRepo = require("../repositories/comment.repository");
const postRepo = require("../repositories/post.repository");

const getComments = async (postId) => {
    try {
        const comments = await commentRepo.getComments(postId);
        return {
            status: true,
            message: "Got all the comments successfully",
            data: comments,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const addComment = async (postId, userId, text) => {
    try {
        const user = await userRepo.findUserById(userId);
        const author = user.firstname + " " + user.lastname;
        const commented_date = new Date();

        const comment = await commentRepo.addComment(
            postId,
            userId,
            author,
            text,
            commented_date
        );
        await postRepo.addCommentToPost(postId, comment._id);
        return {
            status: true,
            message: "Commented successfully",
            data: comment,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const editComment = async (commentId, text) => {
    try {
        const comment = await commentRepo.editComment(commentId, text);
        return {
            status: true,
            message: "Comment edited successfully",
            data: comment,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const deleteComment = async (commentId) => {
    try {
        const comment = await commentRepo.deleteComment(commentId);
        await postRepo.deleteCommentInPost(postId, comment._id);

        return {
            status: true,
            message: "Comment deleted successfully",
            data: comment,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment,
};
