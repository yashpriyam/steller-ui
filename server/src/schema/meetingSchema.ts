import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema<MeetingSchemaType>({
    meetingNumber: { type: String },
    password: { type: String },
    link: { type: String },
    scheduledAt: { type: Date },
    isActive: { type: Boolean, default: false },
});

export const meetingModel = mongoose.model<MeetingSchemaType>("meeting", meetingSchema);