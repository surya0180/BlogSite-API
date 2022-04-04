const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        activity_time: {
            type: String,
            required: true,
        },
        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
    }
);

activitySchema.virtual("forPosts", {
    ref: "post",
    localField: "activityId",
    foreignField: "_id",
    justOne: true,
});

activitySchema.virtual("forQuestions", {
    ref: "question",
    localField: "activityId",
    foreignField: "_id",
    justOne: true,
});

module.exports = mongoose.model("activity", activitySchema);
