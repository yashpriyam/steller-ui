import mongoose, { Schema, model } from "mongoose";
import { feePlanModel, paidUser } from "./index";


const { ObjectId } = mongoose.Schema.Types;

const batchSchema = new mongoose.Schema<BatchSchemaType>({
    batchNumber: {
      type: Number,
      required: true
    },
    numberOfStudents: {
      type: Number,
      required: true
    },
    paymentType: {
      type: ObjectId,
      ref: feePlanModel,
      required: true
    },
    users: [{
      type: ObjectId,
      ref: paidUser,
      required: false
    }]
  });
  
  export const batchModel = model<BatchSchemaType>("batch", batchSchema);
