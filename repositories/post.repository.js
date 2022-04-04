const Post = require("../models/post.model");
const User = require("../models/users.model");

const addPost = async (
    userId,
    author,
    published_date,
    title,
    summary,
    genre,
    banner,
    cells
) => {
    const postObject = new Post({
        userId,
        author,
        published_date,
        title,
        summary,
        genre,
        banner,
        cells,
    });
    return await postObject.save();
};

const updatePost = async (postId, title, summary, genre, banner, cells) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $set: {
                title,
                summary,
                genre,
                banner,
                cells,
            },
        }
    );
};

const deletePost = async (postId, userId) => {
    await Post.updateOne(
        { _id: postId },
        {
            $set: {
                is_active: false,
            },
        }
    );
    return await User.updateOne(
        { _id: userId },
        {
            $pull: {
                posts: postId,
            },
        }
    );
};

const findAllPosts = async (startIndex, limit) => {
    return await Post.find().limit(limit).skip(startIndex).exec();
};

const findPostByPostId = async (postId) => {
    return await Post.findOne({ _id: postId });
};

const findPostsByUserId = async (userId) => {
    return await Post.find({ userId });
};

const addCommentToPost = async (postId, commentId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $addToSet: {
                comments: commentId,
            },
        }
    );
};

const deleteCommentInPost = async (postId, commentId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $pull: {
                comments: commentId,
            },
        }
    );
};

const addLikeToPost = async (userId, postId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $addToSet: {
                likes: userId,
            },
        }
    );
};

const removeLikeFromPost = async (userId, postId) => {
    return await Post.updateOne(
        { _id: postId },
        {
            $pull: {
                likes: userId,
            },
        }
    );
};

const postIsLiked = async (userId, postId) => {
    return (await Post.find({ _id: postId, likes: userId }).count()) > 0;
};

const findNumberOfPages = async (limit) => {
    return Math.ceil((await Post.find()).length / limit);
};

const isPostId = async (postId) => {
    return (await Post.find({ _id: postId }).count()) > 0;
};

const addToSaved = async (contentId, userId) => {
    return Post.updateOne(
        { _id: contentId },
        {
            $addToSet: {
                bookmarks: userId,
            },
        }
    );
};

const removeFromSaved = async (contentId, userId) => {
    return Post.updateOne(
        { _id: contentId },
        {
            $pull: {
                bookmarks: userId,
            },
        }
    );
};

module.exports = {
    addPost,
    updatePost,
    deletePost,
    findAllPosts,
    findPostByPostId,
    findPostsByUserId,
    addCommentToPost,
    deleteCommentInPost,
    addLikeToPost,
    removeLikeFromPost,
    postIsLiked,
    findNumberOfPages,
    isPostId,
    addToSaved,
    removeFromSaved,
};
