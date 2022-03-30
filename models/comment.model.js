const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: {
        type: String,
        required: true,
    },
    commented_date: {
        type: String,
        required: true,
    },
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        default: null,
    },
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        default: null,
    },
});

module.exports = mongoose.model("comment", commentModel);
