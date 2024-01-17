import { Schema, model } from 'mongoose';

const questionAttemptSchema = new Schema<QuestionAttemptSchemaType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    isCorrect: { type: Boolean },
    response: {
      type: [{ imageUrl: String, text: String, iframe: String, isChecked:Boolean }],
      required: true,
    },
  },
  { timestamps: true }
);

export const questionAttempt = model<QuestionAttemptSchemaType>('QuestionAttempt', questionAttemptSchema);