const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    // user : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'user'
    // },

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    genres: {
        type: [String],
    },
    followersList: {
        type: [String],
    },
    followingList: {
        type: [String],
    },
    postIds: {
        type: [String],
    },
    questionIds: {
        type: [String],
    },
    recentActivity: {
        type: [String],
    },
    savedContent: {
        type: [String],
    },
    likedContent: {
        type: [String],
    },
});

module.exports = mongoose.model("profile", profileSchema);
