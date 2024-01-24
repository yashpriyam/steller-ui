import mongoose, { model } from "mongoose";
import { weekModel } from "./weekSchema";

const { ObjectId } = mongoose.Schema.Types;

const feePlanSchema = new mongoose.Schema<FeePlanSchemaType>({
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  installments: {
    type: [
      {
        id: String,
        amount: String,
        sequence: String,
        dueDate: Date,
        accessWeeks: {
            type: ObjectId,
            ref: weekModel
        },
        miscellaneous: {
            type: Object,
            required: false
          },
      },
    ],
    required: false,
  },
  miscellaneous: {
    type: Object,
    required: false
  }
});

export const feePlanModel = model<FeePlanSchemaType>("feePlan", feePlanSchema);
