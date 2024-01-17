
import { Schema, model, Types } from 'mongoose';
import { User } from './userSchema';


const userProfileSchema = new Schema<UserProfileSchema>({
    userId: { type: Types.ObjectId, ref: User },
    personalDetails: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        headline: { type: String },
        address: {
            colony: { type: String },
            city: { type: String },
        },
    },
    socialDetail: {
        githubLink: { type: String },
        linkedInLink: { type: String },
    },
    experienceData: [{
        companyName: { type: String },
        companyLocation: { type: String },
        role: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: [String] },
        techStack: { type: [String] },
    }],
    projectsData: [{
        heading: { type: String },
        description: { type: [String] },
        deployLink: { type: String },
        gitHubLink: { type: String },
        techStack: { type: [String] },
    }],
    skillsData: {
        language: { type: [String] },
        frontend: { type: [String] },
        backend: { type: [String] },
        database: { type: [String] },
        versionControl: { type: [String] },
        cIcD: { type: [String] },
    },
    educationalData: [{
        instituteName: { type: String },
        location: { type: String },
        course: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        cgpa: { type: String },
    }],
    achievementsData: [{
        icon: { type: String },
        header: { type: String },
        description: { type: String },
        links: { type: String },
    }],
});

export const UserProfileModal = model<UserProfileSchema>('userProfile', userProfileSchema);

