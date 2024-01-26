const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        dayNumber: {
            type: Number,
            required: true,
        },
        weekNumber: {
            type: Number,
            required: true,
        },
        batchCode: {
            type: String,
            required: true
        },
        videoNumber: {
            type: Number,
            required: true,
        },
        topics: {
            type: [String],
            required: true,
        },
        links: {
            webmasters: String,
            youtube: {
                type: String,
                required: true,
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        duration: String,
    },
    { timestamps: true }
);

const videoModel = mongoose.model("video", videoSchema);

export { videoModel };