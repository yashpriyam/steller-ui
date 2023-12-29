import mongoose from 'mongoose';

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
        enum: ['online', 'offline'],
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
        hash: String,
        salt: String,
    },
});

const PaidUser = mongoose.model('PaidUser', paidUserSchema);

export { PaidUser };
