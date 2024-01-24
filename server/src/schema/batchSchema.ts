import mongoose, { Schema, model } from "mongoose";
import { User, feePlanModel, paidUser } from "./index";


const { ObjectId } = mongoose.Schema.Types;

const batchSchema = new mongoose.Schema<BatchSchemaType>({
    batchNumber: {
      type: Number,
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
    ]
  });
  
  export const batchModel = model<BatchSchemaType>("batch", batchSchema);
