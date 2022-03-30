const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
    banner: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    bookmarks: {
        type: Number,
        required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    cells: [{ type: mongoose.Schema.Types.ObjectId, ref: "postcell" }],
});

module.exports = mongoose.model("post", postSchema);
