const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    answered_date: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("answer", answerSchema);
