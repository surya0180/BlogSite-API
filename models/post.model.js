const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    is_active: {
        type: Boolean,
        default: true,
    },
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
    banner: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        default: 0,
    },
    bookmarks: {
        type: Number,
        default: 0,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    cells: {
        type: Array,
        required: false,
        default: [],
    },
});

module.exports = mongoose.model("post", postSchema);
