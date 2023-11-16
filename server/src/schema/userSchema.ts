import mongoose from "mongoose";
import { convertUTCtoIST } from "@utils/time-utils";

const sessionPreferences = Object.freeze({
  online: "online",
  offline: "offline",
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String },
    phoneNumber: { type: String },
    isJobSeeker: { type: Boolean, default: false },
    occupation: { type: String },
    sessionPreference: {
      type: String,
      enum: Object.values(sessionPreferences),
      default: sessionPreferences.offline,
    },
    expectedSalary: { type: String },
    IST: {
      type: String,
      default: convertUTCtoIST(),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export { User };
