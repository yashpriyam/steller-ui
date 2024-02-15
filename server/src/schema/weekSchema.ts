import mongoose, { Schema, model } from 'mongoose';
import { dayModel } from "./daySchema";
const { ObjectId } = mongoose.Schema.Types;

const weekSchema = new Schema<WeekDataType>({
    batchCode: {
        type: String,
    },
    weekNumber: {
        type: Number,
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDisabledForUnpaidUsers: {
        type: Boolean,
        default: true,
    },
    days: [{ type: ObjectId, ref: dayModel }],
    date: {
        type : Date,
    },
});

export const weekModel = model<WeekDataType>('week', weekSchema);