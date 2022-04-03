const Activity = require("../models/activity.model");

const getLikedContent = async (userId) => {
    return await Activity.find({ userId, type: "liked" });
};

const getSavedContent = async (userId) => {
    return await Activity.find({ userId, type: "saved" });
};

const getRecentActivity = async (userId) => {
    return await Activity.find({ userId, type: "recents" })
        .sort({ activity_time: -1 })
        .limit(10);
};

const getActivityIdByContentId = async (userId, contentId) => {
    return (await Activity.findOne({ userId, contentId }))._id;
};

const addToLikedContent = async (contentType, contentId, userId, timestamp) => {
    return await Activity.updateOne(
        { userId, type: "liked" },
        {
            $set: {
                activity_time: timestamp,
                contentId,
            },
        }
    );
};
const removeFromLikedContent = async (userId, contentId) => {
    return await Activity.deleteOne({ userId, contentId, type: "liked" });
};
const addToSavedContent = async (contentType, contentId, userId, timestamp) => {
    return await Activity.updateOne(
        { userId, type: "saved" },
        {
            $set: {
                activity_time: timestamp,
                contentId,
            },
        }
    );
};
const removeFromSavedContent = async (contentType, contentId, userId) => {
    return await Activity.deleteOne({ userId, contentId, type: "saved" });
};
const addToRecentActivity = async (
    contentType,
    contentId,
    userId,
    timestamp
) => {
    return await Activity.updateOne(
        { userId, type: "recents" },
        {
            $set: {
                activity_time: timestamp,
                contentId,
            },
        }
    );
};

module.exports = {
    getLikedContent,
    getSavedContent,
    getRecentActivity,
    getActivityIdByContentId,
    addToLikedContent,
    removeFromLikedContent,
    addToSavedContent,
    removeFromSavedContent,
    addToRecentActivity,
};
