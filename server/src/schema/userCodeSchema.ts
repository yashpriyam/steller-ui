import { Schema, model } from 'mongoose';

const userCodeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'question',
      required: true,
    },
    weekNumber: {
      type: Number,
    },
    dayNumber: {
      type: Number,
    },
    code: {
      html: String,
      css: String,
      js: String,
    },
  },
  { timestamps: true }
);

const userCodeModel = model('userCode', userCodeSchema);

export { userCodeModel };
