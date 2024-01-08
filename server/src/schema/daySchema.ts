const mongoose = require("mongoose");

const daySchema = new mongoose.Schema(
    {
        dayTitle: {
            type: String,
        },
        dayDescription: {
            type: String,
        },
        dayNumber: {
            type: String,
        },
        topics: {
            type: [String],
        },
        notes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notesModel',
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'videoModel',
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questionModel',
        }
    }
);

const dayModel = mongoose.model("day", daySchema);

export { dayModel };