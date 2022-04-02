const Activity = require("../models/activity.model");

const getLikedContent = async (userId) => {
    return await Activity.find({ userId, type: "liked" });
};

const getSavedContent = async (userId) => {
    return await Activity.find({ userId, type: "saved" });
};

const getRecentActivity = async (userId) => {
    return await Activity.find({ userId, type: "recents" });
};

const addToLikedContent = async (contentType, contentId, userId, timestamp) => {
    return await Activity.updateOne(
        { userId, type: "liked" },
        {
            $set: {
                activity_time: timestamp,
            },
            $addToSet:
                contentType === "post"
                    ? {
                          posts: contentId,
                      }
                    : {
                          questions: contentId,
                      },
        }
    );
};
const removeFromLikedContent = async (contentType, contentId, userId) => {
    return await Activity.updateOne(
        { userId, type: "liked" },
        {
            $pull:
                contentType === "post"
                    ? {
                          posts: contentId,
                      }
                    : {
                          questions: contentId,
                      },
        }
    );
};
const addToSavedContent = async (contentType, contentId, userId, timestamp) => {
    return await Activity.updateOne(
        { userId, type: "saved" },
        {
            $set: {
                activity_time: timestamp,
            },
            $addToSet:
                contentType === "post"
                    ? {
                          posts: contentId,
                      }
                    : {
                          questions: contentId,
                      },
        }
    );
};
const removeFromSavedContent = async (contentType, contentId, userId) => {
    return await Activity.updateOne(
        { userId, type: "saved" },
        {
            $pull:
                contentType === "post"
                    ? {
                          posts: contentId,
                      }
                    : {
                          questions: contentId,
                      },
        }
    );
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
            },
            $addToSet:
                contentType === "post"
                    ? {
                          posts: contentId,
                      }
                    : {
                          questions: contentId,
                      },
        }
    );
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
