const mongoose = require("mongoose");

const postCellSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    seq_no: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("postcell", postCellSchema);
