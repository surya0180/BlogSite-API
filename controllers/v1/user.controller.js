const userRepo = require("../../repositories/user.repository");
const userService = require("../../services/user.service");

const getUser = async (req, res) => {
    try {
        const user = await userRepo.findUserById(req.user.id);
        return res.json({
            status: true,
            message: "User found successfully",
            data: user,
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
            data: userprofileid,
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
        if (body.email !== undefined && body.uid !== undefined) {
            const response = await userService.updateUser(
                body.uid,
                body.firstname,
                body.lastname,
                body.email,
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
        if (body.userId !== undefined && body.follow_userId != undefined) {
            const response = await userService.followUser(
                body.userId,
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
        if (body.userId !== undefined && body.follow_userId != undefined) {
            const response = await userService.unfollowUser(
                body.userId,
                body.follow_userId
            );
            return res.status(200).json({
                status: true,
                message: "Unfollowed the user successfully",
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
        res.status(500).json({
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
};
