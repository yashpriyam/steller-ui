import mongoose, { model } from "mongoose";


const feePlanSchema = new mongoose.Schema<FeePlanSchemaType>({
  _id: {
    type: String,
    required: true
  },
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
        accessWeeks: [String],
        miscellaneous: {
            type: String,
            required: false
          },
      },
    ],
    required: false,
  },
  miscellaneous: {
    type: String,
    required: false
  }
});

export const feePlanModel = model<FeePlanSchemaType>("feePlan", feePlanSchema);
