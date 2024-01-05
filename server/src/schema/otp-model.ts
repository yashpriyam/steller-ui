const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    emailOtp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isEmailVerified: { type: Boolean, default: false }
})

const otpModel = mongoose.model("otp", otpSchema);

export { otpModel };