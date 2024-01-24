import mongoose, { Schema, model } from "mongoose";
import { batchModel, feePlanModel, paidUser } from "./index";

const { ObjectId } = mongoose.Schema.Types;

const userPaymentSchema = new mongoose.Schema<UserPaymentSchemaType>({
  user: {
    type: ObjectId,
    ref: paidUser, // Reference to the User model
    required: true
  },
  batch: {
    type: ObjectId,
    ref: batchModel, // Reference to the Batch model
    required: true
  },
  feePlan: {
    type: ObjectId,
    ref: feePlanModel, // Reference to the FeePlan model
    required: true
  },
  paymentType: {
    type: String,
    required: false
  },
  installmentNumber: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

export const userPaymentModel = model<UserPaymentSchemaType>("userPayment", userPaymentSchema);
