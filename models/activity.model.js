const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
});

module.exports = mongoose.model("activity", activitySchema);
