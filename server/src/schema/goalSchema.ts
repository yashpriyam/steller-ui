import mongoose from "mongoose";
import { weekModel } from "./weekSchema";
import { questionModel } from "./questionSchema";
import { goalTypeModel } from "./goalTypeSchema";
import { batchModel } from "./batchSchema";
import { topicModel } from "./topicSchema";

const { ObjectId } = mongoose.Schema.Types;

const goalSchema = new mongoose.Schema<Goal>(
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
        type: ObjectId,
        ref: topicModel
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

export const Goal = mongoose.model<Goal>("Goal", goalSchema);
