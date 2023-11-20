import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  programType: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Program = mongoose.model("program", programSchema);

export { Program };
