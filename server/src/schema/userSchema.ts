import mongoose from "mongoose";
import { convertUTCtoIST } from "@utils";
import { feePlanModel } from "./feePlanSchema";
const { ObjectId } = mongoose.Schema.Types;
const sessionPreferences = Object.freeze({
  online: "online",
  offline: "offline",
});

const userSchema = new mongoose.Schema<UserSchemaType>(
  {
    email: { type: String, required: false },
    name: { type: String, required: false },
    phoneNumber: { type: String, required: false },
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
    userProfile: { type: ObjectId, ref: "userProfile" },
    location: {
      type: String,
    },
    courseYear: {
      type: String,
    },
    course: {
      type: String,
    },
    branch: {
      type: String,
    },
    batchCode: {
      type: String,
    },
    feePlan: {
      type: ObjectId,
      ref: feePlanModel,
    },
    temporaryAccess: {
      allowTemporaryAccess: {
        type: Boolean,
        required: false
      },
      allowedAccessDate: {
        type: Date,
        required: false
      }
    },
    socialLinks: {
      type: mongoose.Schema.Types.Mixed
    }, 
    leetCodeUserProfile: { type: ObjectId, ref: 'LeetCodeUserProfile' },
    recentSubmissions: [{ type: ObjectId, ref: 'RecentSubmission' }]
  },
  { timestamps: true }
);

const User = mongoose.model<UserSchemaType>("user", userSchema);

export { User };
