const mongoose = require("mongoose");

const { Schema } = mongoose;

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topics: {
        type: [String],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    dayNumber: {
        type: Number,
        required: true,
    },
    weekNumber: {
        type: Number,
        required: true,
    },
    description: {
      type: String,
    },
    noOfPages: {
      type: Number, 
    },
    estimatedReadingTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const notesModel = mongoose.model("notes", notesSchema);

export { notesModel };
