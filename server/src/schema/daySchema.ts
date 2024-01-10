import mongoose, { Schema, model } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const daySchema = new Schema<DaySchemaType>({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dayNumber: {
            type: Number,
            required: true,
        },
        topics: {
            type: [String],
            required: true,
        },
        notes: [{
            type: ObjectId,
            ref: 'notesModel',
        }],
        videos: [{
            type: ObjectId,
            ref: 'videoModel',
        }],
        questions: [{
            type: ObjectId,
            ref: 'questionModel',
        }]
    }
);

export const dayModel = model<DaySchemaType>("day", daySchema);