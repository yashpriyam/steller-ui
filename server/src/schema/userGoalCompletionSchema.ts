import mongoose from "mongoose";
import { User } from "./userSchema";
import { Goal } from "./goalSchema";

const { ObjectId } = mongoose.Types
const userGoalCompletionSchema = new mongoose.Schema<UserGoalCompletion>(
  {
    userId: {
      type: ObjectId, 
      ref: User,
    },
    goalId: {
      type: ObjectId,
      ref: Goal,
    },
    completedAt: {
      type: Date,
      default: Date.now, 
    },
    userResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    weekNumber: Number,
  },
  {
    timestamps: true,
  }
);

export const UserGoalCompletion = mongoose.model<UserGoalCompletion>(
  "UserGoalCompletion",
  userGoalCompletionSchema
);
