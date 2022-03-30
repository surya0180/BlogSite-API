const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    published_date: {
        type: String,
        required: true,
    },
    screenshot: {
        type: String,
        required: false,
    },
    up_votes: {
        type: Number,
        required: true,
    },
    bookmarks: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "answer" }],
});

module.exports = mongoose.model("question", questionSchema);
