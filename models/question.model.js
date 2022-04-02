const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
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
    up_votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    status: {
        type: Boolean,
        default: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "answer" }],
});

module.exports = mongoose.model("question", questionSchema);
