import mongoose, { Schema, model } from "mongoose";

const questionTypes = Object.freeze({
    multi: "multi",
    single: "single"
})
const questionDurationTypes = Object.freeze({
    timed: "timed",
    recorded: "recorded"
})
const questionSchema = new Schema<QuestionSchemaType>({
  question: { type: [{ imageUrl: String, text: String }], required: true },
  batchCode: { type: String, required: true },
  options: { type: [{ imageUrl: String, text: String }], required: true },
  questionType: {
    type: String,
    enum: Object.values(questionTypes),
    required: true,
  },
  answer: { type: [{ imageUrl: String, text: String }], required: true },
  marks: { type: Number, default: 1 },
  meta: {
    topic: { type: String, required: true },
    day: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    isArchived: { type: Boolean, required: true },
    type: {
      type: String,
      enum: Object.values(questionDurationTypes),
      required: true,
    },
    expiresInMins: { type: Number, required: true },
    isOpenable: { type: Boolean, required: true },
  },
});

export const questionModel = model<QuestionSchemaType>("question", questionSchema);

