import mongoose, { model } from "mongoose";
import { User, batchModel, feePlanModel, paidUser } from "./index";

const { ObjectId } = mongoose.Schema.Types;

const userPaymentSchema = new mongoose.Schema<UserPaymentSchemaType>({
    user: {
        type: ObjectId,
        ref: User, // Reference to the User model
        required: true,
      },
      batch: {
        type: ObjectId,
        ref: batchModel, 
        required: true,
      },
      feePlan: {
        type: ObjectId,
        ref: feePlanModel, // Reference to the FeePlan model
        required: true,
      },
      installmentId: {
        type: String,
      },
      isApproved: {
        type: Boolean,
        default: false
      },
      isRejected: {
        type: Boolean,
        default: false
      },
      isPending: {
        type: {
          totalAmount: String,
          totalPendingAmount: String,
        },
      }
});

export const userPaymentModel = model<UserPaymentSchemaType>("userPayment", userPaymentSchema);
