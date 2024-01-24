import mongoose, { Schema, model } from "mongoose";
import { User, feePlanModel } from "./index";


const { ObjectId } = mongoose.Schema.Types;

const batchSchema = new mongoose.Schema<BatchSchemaType>({
    batchCode: {
      type: String,
      required: true
    },
    paymentType: {
      type: ObjectId,
      ref: feePlanModel,
      required: false
    },
    demoStudents:[{
      type: ObjectId,
      ref: User,
      required: false
    }],
    paidStudents: [{
        type: ObjectId,
        ref: User,
        required: false
      }
    ],
    registeredStudents: [{
        type: ObjectId,
        ref: User,
        required: false
      }
    ],
    startDate: {
        type: Date,
    },

  });
  
  export const batchModel = model<BatchSchemaType>("batch", batchSchema);
