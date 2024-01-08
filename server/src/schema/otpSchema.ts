import { Schema,model } from "mongoose";
const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  emailOtp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isEmailVerified: { type: Boolean, default: false },
});

const otpModel = model("otp", otpSchema);

export { otpModel };
