import { Schema, model } from "mongoose";

const questionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  batchCode: { type: String, required: true },
  options: { type: [{ imageUrl: String, text: String }], required: true },
  questionType: { type: String, enum: ["multi", "single"], required: true },
  answer: { type: [{ imageUrl: String, text: String }], required: true },
  marks: { type: Number, default: 1 },
  meta: {
    topic: { type: String, required: true },
    day: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    isArchived: { type: Boolean, required: true },
    type: { type: String, enum: ["timed", "recorded"], required: true },
    expiresInMins: { type: Number, required: true },
    isOpenable: { type: Boolean, required: true },
  },
});

export const Question = model<IQuestion>("Question", questionSchema);
