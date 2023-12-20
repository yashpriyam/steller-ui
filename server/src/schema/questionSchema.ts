import { Schema, model, Document , ObjectId} from 'mongoose';

const questionAttemptSchema = new Schema<IQuestionAttemptType>({
  userId: { type: Schema.Types.ObjectId , ref: 'user', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'question', required: true },
  isCorrect: { type: Boolean },
  response: { type: [{ imageUrl: String, text: String }], required: true },
},{ timestamps: true });

export const QuestionAttempt = model<IQuestionAttemptType>('QuestionAttempt', questionAttemptSchema);