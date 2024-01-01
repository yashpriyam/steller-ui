const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailVerificationSchema = new Schema({
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
    isEmailVerified: { 
        type: Boolean,
        default: false
    }
})

const emailVerificationModel = mongoose.model("otp", emailVerificationSchema);

export { emailVerificationModel };