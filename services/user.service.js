const userRepo = require("../repositories/user.repository");

const updateUser = async (uid, firstname, lastname, bio, genres) => {
    try {
        const user = await userRepo.findUserById(uid);
        if (!user) {
            return {
                status: false,
                message: "User does not exists",
                data: {},
                errors: user,
            };
        }
        const update = await userRepo.updateUserById(
            uid,
            firstname,
            lastname,
            bio,
            genres
        );
        return {
            status: true,
            message: "User updated successfully",
            data: {},
            errors: {},
        };
    } catch (error) {}
};

const followUser = async (userId, follow_userId) => {
    try {
        return await userRepo.addFollower(userId, follow_userId);
    } catch (error) {
        throw error;
    }
};

const unfollowUser = async (userId, follow_userId) => {
    try {
        return await userRepo.removeFollower(userId, follow_userId);
    } catch (error) {
        throw error;
    }
};

const removeFollower = async (userId, follow_userId) => {
    try {
        return await userRepo.removeOwnFollower(userId, follow_userId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateUser,
    followUser,
    unfollowUser,
    removeFollower,
};
