const userRepo = require("../../repositories/user.repository");
const userService = require("../../services/user.service");

const getUser = async (req, res) => {
    try {
        const user = await userRepo.findUserById(req.user.id);
        const flr = await userRepo.findAllFollowers(user.followers);
        const flg = await userRepo.findAllFollowing(user.following);
        const finalUser = {
            ...user._doc,
            followers: flr,
            following: flg,
        };
        return res.json({
            status: true,
            message: "User found successfully",
            data: finalUser,
            errors: {},
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            error: err.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const userprofileid = await userRepo.findUserById(req.params.user_id);
        const flr = await userRepo.findAllFollowers(userprofileid.followers);
        const flg = await userRepo.findAllFollowing(userprofileid.following);
        const finalUser = {
            ...userprofileid._doc,
            followers: flr,
            following: flg,
        };
        if (!userprofileid) {
            return res.status(400).json({
                status: false,
                message: "There is no profile related to this user",
                data: {},
                errors: userprofileid,
            });
        }
        return res.status(200).json({
            status: true,
            message: "User found successfully",
            data: finalUser,
            errors: {},
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: {},
            errors: err,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await userService.updateUser(
                req.user.id,
                body.firstname,
                body.lastname,
                body.bio,
                body.genres
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: { msg: "Missing parameters" },
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: {},
            errors: err,
        });
    }
};

const followUser = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined && body.follow_userId != undefined) {
            const response = await userService.followUser(
                req.user.id,
                body.follow_userId
            );
            return res.status(200).json({
                status: true,
                message: "Followed the user successfully",
                data: {},
                errors: {},
            });
        } else {
            res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: {},
            errors: err,
        });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined && body.follow_userId != undefined) {
            const response = await userService.unfollowUser(
                req.user.id,
                body.follow_userId
            );
            return res.status(200).json({
                status: true,
                message: "Unfollowed the user successfully",
                data: {},
                errors: {},
            });
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
            message: "Internal Server Error",
            data: {},
            errors: error,
        });
    }
};

const removeFollower = async (req, res) => {
    try {
        const body = req.body;
        if (body.userId !== undefined && body.follow_userId !== undefined) {
            await userService.removeFollower(body.userId, body.follow_userId);
            return res.status(200).json({
                status: true,
                message: "Removed the follower successfully",
                data: {},
                errors: {},
            });
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
            message: "Internal Server Error",
            data: {},
            errors: error,
        });
    }
};

module.exports = {
    getUser,
    getUserById,
    updateUser,
    followUser,
    unfollowUser,
    removeFollower,
};
