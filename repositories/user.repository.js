const User = require("../models/users.model");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserById = async (id) => {
    return await User.findOne({ _id: id });
};

const addUser = async (firstname, lastname, email, password) => {
    try {
        const user = new User({
            firstname,
            lastname,
            email,
            password,
        });
        return user.save();
    } catch (error) {
        return error.message;
    }
};

const addPostIdToUser = async (userId, postId) => {
    return await User.updateOne(
        { _id: userId },
        {
            $addToSet: {
                posts: postId,
            },
        }
    );
};

const addQuestionIdToUser = async (userId, questionId) => {
    return await User.updateOne(
        { _id: userId },
        {
            $addToSet: {
                questions: questionId,
            },
        }
    );
};

const deletePostIdFromUser = async (userId, postId) => {
    return await User.updateOne(
        { _id: userId },
        {
            $pull: {
                posts: postId,
            },
        }
    );
};

const deleteQuestionIdFromUser = async (userId, questionId) => {
    return await User.updateOne(
        { _id: userId },
        {
            $pull: {
                questions: questionId,
            },
        }
    );
};

const updateUserById = async (uid, firstname, lastname, email, bio, genres) => {
    return await User.updateOne(
        { _id: uid },
        {
            $set: {
                firstname,
                lastname,
                email,
                bio,
            },
            $addToSet: {
                genres,
            },
        }
    );
};

const addFollower = async (userId, follow_userId) => {
    await User.updateOne(
        { _id: userId },
        {
            $addToSet: {
                following: follow_userId,
            },
        }
    );
    await User.updateOne(
        { _id: follow_userId },
        {
            $addToSet: {
                followers: userId,
            },
        }
    );
};

const removeFollower = async (userId, follow_userId) => {
    await User.updateOne(
        { _id: userId },
        {
            $pull: {
                following: follow_userId,
            },
        }
    );
    await User.updateOne(
        { _id: follow_userId },
        {
            $pull: {
                followers: userId,
            },
        }
    );
};

module.exports = {
    findUserByEmail,
    findUserById,
    addUser,
    updateUserById,
    addFollower,
    removeFollower,
    addPostIdToUser,
    addQuestionIdToUser,
    deletePostIdFromUser,
    deleteQuestionIdFromUser,
};
