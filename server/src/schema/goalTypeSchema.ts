import mongoose, { model } from "mongoose";


const goalTypeSchema = new mongoose.Schema({
      goalType: {
        type: String
      }
})

export const goalTypeModel = model("goalType", goalTypeSchema)