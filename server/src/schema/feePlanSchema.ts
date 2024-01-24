import mongoose, { model } from "mongoose";


const feePlanSchema = new mongoose.Schema<FeePlanSchemaType>({
  type: {
    type: String,
    enum: ['3_installments', 'one_installment_and_remaining_after_job'],
    unique: true,
    required: true
  },
  totalFee: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

export const feePlanModel = model<FeePlanSchemaType>("feePlan", feePlanSchema);
