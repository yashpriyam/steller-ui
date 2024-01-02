import mongoose from "mongoose";
import { convertUTCtoIST } from "@utils";

const userActivitySchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    isOpened: {
        type: Boolean,
        default: false
    },
    devices: {
        type: [String],
        default: []
    },
    IST: {
        type: String,
        default: convertUTCtoIST()
    },
    isValidPhoneNumber: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const userActivityModel = mongoose.model("userActivity", userActivitySchema);

export { userActivityModel };