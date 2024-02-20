import mongoose from "mongoose";
import { weekModel } from "./weekSchema";
import { questionModel } from "./questionSchema";
import { goalTypeModel } from "./goalTypeSchema";
import { batchModel } from "./batchSchema";

const { ObjectId } = mongoose.Schema.Types;

const goalSchema = new mongoose.Schema<IGoal>(
  {
    title: String,
    description: String,
    goalType: {
      type: ObjectId,
      ref: goalTypeModel,
    },
    isAutomated: {
      type: Boolean,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "any"],
    },
    isActive: Boolean,
    startWeek: {
      type: ObjectId,
      ref: weekModel,
    },
    endWeek: {
      type: ObjectId,
      ref: weekModel,
    },
    questionList: [
      {
        type: ObjectId,
        ref: questionModel,
      },
    ],
    topicList: [
      {
        type: String,
      },
    ],
    subTopicList: [
      {
        type: String,
      },
    ],
    dependedOn: {
        type:  mongoose.Schema.Types.Mixed,
    },
    batchCode: {
      type: ObjectId,
      ref: batchModel
    },
    isMandatory: {
      type: Boolean
    }

  },
  {
    timestamps: true,
  }
);

export const Goal = mongoose.model<IGoal>("Goal", goalSchema);
