const Activity = require("../models/activity.model");

const getSavedContent = async (userId, startIndex, limit) => {
    return await Activity.find({ userId, type: "saved" })
        .populate("forPosts")
        .populate("forQuestions")
        .sort({ activity_time: -1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
};

const getRecentActivity = async (userId) => {
    return await Activity.find({ userId, type: "recents" })
        .sort({ activity_time: -1 })
        .limit(10);
};

const getActivityIdByContentId = async (userId, contentId) => {
    return (await Activity.findOne({ userId, contentId }))._id;
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
    getSavedContent,
    getRecentActivity,
    getActivityIdByContentId,
    addToSavedContent,
    removeFromSavedContent,
    addToRecentActivity,
};
