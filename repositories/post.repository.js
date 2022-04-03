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

const findNumberOfPages = async (limit) => {
    return Math.ceil((await Post.find()).length / limit);
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
    findNumberOfPages,
};
