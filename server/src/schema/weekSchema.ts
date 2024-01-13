import mongoose, { Schema, model } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const weekSchema = new Schema<WeekSchemaType>({
    batchCode: {
        type: String,
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
    weekNumber: {
        type: Number,
        required: true,
        unique: true
    },
    days: [{ type: ObjectId, ref: 'dayModel' }],
});

export const weekModel = model<WeekSchemaType>('week', weekSchema);