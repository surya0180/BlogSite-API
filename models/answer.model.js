const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "question" },
    answered_date: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    status: {
        type: Boolean,
        default: null,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("answer", answerSchema);
