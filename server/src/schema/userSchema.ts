import mongoose, { Types } from "mongoose";
import { convertUTCtoIST } from "@utils";

const sessionPreferences = Object.freeze({
  online: "online",
  offline: "offline",
});

const userSchema = new mongoose.Schema<UserSchemaType>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: false },
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
    collegeName: { type: String },
    profileImage: {
      publicId: String,
      secureUrl: String,
    },
    coverImage: {
      publicId: String,
      secureUrl: String,
    },
    userProfile: { type: Types.ObjectId, ref: "userProfile" },
  },
  { timestamps: true }
);

const User = mongoose.model<UserSchemaType>("user", userSchema);

export { User };
