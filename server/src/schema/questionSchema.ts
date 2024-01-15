import { Schema, model } from "mongoose";

const questionTypes = {
    multi: "multi",
    single: "single",
    fillup: "fillup"
}
const questionDurationTypes = {
    timed: "timed",
    recorded: "recorded"
}
const questionSchema = new Schema<QuestionSchemaType>({
  title: { type: [{ imageUrl: String, text: String, iframe: String }], required: true },
  batchCode: { type: String, required: true },
  options: { type: [{ imageUrl: String, text: String, iframe: String }], required: true },
  questionType: {
    type: String,
    enum: questionTypes,
    required: true,
  },
  answer: { type: [{ imageUrl: String, text: String, iframe: String }], required: true },
  marks: { type: Number, default: 1 },
  meta: {
    topic: { type: String, required: true },
    day: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    isArchived: { type: Boolean, required: true },
    type: {
      type: String,
      enum: questionDurationTypes,
      required: true,
    },
    expiresInMins: { type: Number, required: true },
    isOpenable: { type: Boolean, required: true },
  },
});

export const questionModel = model<QuestionSchemaType>("question", questionSchema);

