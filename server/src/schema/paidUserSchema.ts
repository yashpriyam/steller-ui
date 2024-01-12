import mongoose from "mongoose";

const sessionPreferenceEnum = { online: "online", offline: "offline" };
const paidUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  profileImg: {
    publicId: {
      type: String,
      required: false,
    },
    secureUrl: {
      type: String,
      required: false,
    },
  },
  batchCode: {
    type: String,
    required: false,
  },
  sessionPreference: {
    type: String,
    enum: sessionPreferenceEnum,
    required: false,
  },
  professionalStatus: {
    type: String,
    required: false,
  },
  college: {
    type: String,
    required: false,
  },
  expectedSalary: {
    type: String,
    required: false,
  },
  socialHandles: {
    linkedIn: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    medium: {
      type: String,
      required: false,
    },
    portfolio: {
      type: String,
      required: false,
    },
  },
  address: {
    type: String,
    required: false,
  },
  password: {
    type:String
  }
});

const paidUser = mongoose.model("PaidUser", paidUserSchema);

export { paidUser };
