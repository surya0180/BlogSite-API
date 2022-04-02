const activityService = require("../../services/activity.service");

const getLikedContent = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await activityService.getLikedContent(req.user.id);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const getSavedContent = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await activityService.getSavedContent(req.user.id);
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined) {
            const response = await activityService.getRecentContent(
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const addToLikedContent = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.addToLikedContent(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const removeFromLikedContent = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.removeFromLikedContent(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const addToSavedContent = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.addToSavedContent(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const removeFromSavedContent = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.removeFromSavedContent(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

const addToRecentActivity = async (req, res) => {
    try {
        const body = req.body;
        if (
            req.user.id !== undefined &&
            body.contentType !== undefined &&
            body.contentId !== undefined
        ) {
            const response = await activityService.addToRecentActivity(
                body.contentType,
                body.contentId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing paramters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            message: error.message,
        });
    }
};

module.exports = {
    getLikedContent,
    getSavedContent,
    getRecentActivity,
    addToLikedContent,
    removeFromLikedContent,
    addToSavedContent,
    removeFromSavedContent,
    addToRecentActivity,
};
