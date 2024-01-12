import mongoose, { Schema, model } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const daySchema = new Schema<DaySchemaType>({
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        dayNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        topics: {
            type: [String],
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