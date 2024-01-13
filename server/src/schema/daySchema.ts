import mongoose, { Schema, model } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const daySchema = new Schema<CreateDayDataType>({
  batchCode: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  dayNumber: {
    type: Number,
  },
  weekNumber: {
    type: Number,
  },
  topics: {
    type: [String],
  },
  notes: [
    {
      type: ObjectId,
      ref: "notesModel",
    },
  ],
  videos: [
    {
      type: ObjectId,
      ref: "videoModel",
    },
  ],
  questions: [
    {
      type: ObjectId,
      ref: "questionModel",
    },
  ],
});

export const dayModel = model<CreateDayDataType>("day", daySchema);
