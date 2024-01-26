import { Schema, model } from "mongoose";


const videoSchema = new Schema<CreateVideoType>(
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

const videoModel = model<CreateVideoType>("video", videoSchema);

export { videoModel };