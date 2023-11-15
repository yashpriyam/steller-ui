import mongoose from "mongoose";
import { convertUTCtoIST } from "../utils/time-utils";

const sessionPreferences = Object.freeze({
  online: "online",
  offline: "offline",
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String },
    phoneNumber: { type: String },

    // areyoulookingforajobinternshiprightnow: { type: String },
    isJobSeeker: { type: Boolean, default: false },

    // currentprofessinalstatus: { type: String },
    occupation: { type: String },

    // thesessionsareconductedofflineandonlineaswellatthesametimewhatwouldyouprefer:
    //   { type: String, enum:Object.values(sessionPreferences) },
    sessionPreference: {
      type: String,
      enum: Object.values(sessionPreferences),
      default: sessionPreferences.offline,
    },

    // whatsagoodsalarythatcanmotivateyoutoacceptajoboffer: { type: String },
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
