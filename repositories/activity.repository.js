const Activity = require("../models/activity.model");

const getLikedContent = async (userId) => {
    return await Activity.find({ userId, type: "liked" });
};

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

const addToLikedContent = async (contentType, contentId, userId, timestamp) => {
    const activity = new Activity({
        type: "liked",
        userId,
        activity_time: timestamp,
        contentId,
    })
    return await activity.save()
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

const isActivityExists = async (contentId, contentType, userId) => {
    return await Activity.exists({contentId, userId, type: contentType})
}

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
