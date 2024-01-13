import mongoose, { Schema, model } from 'mongoose';
import { dayModel } from "./daySchema";
const { ObjectId } = mongoose.Schema.Types;

const weekSchema = new Schema<WeekSchemaType>({
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
    weekNumber: {
        type: Number,
    },
    days: [{ type: ObjectId, ref: dayModel }],
});

export const weekModel = model<WeekSchemaType>('week', weekSchema);