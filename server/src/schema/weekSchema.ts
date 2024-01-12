import mongoose, { Schema, model } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const weekSchema = new Schema<CreateWeekDataType>({
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
    days: [{ type: ObjectId, ref: 'dayModel' }],
});

export const weekModel = model<CreateWeekDataType>('week', weekSchema);