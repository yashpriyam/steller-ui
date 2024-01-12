import mongoose from "mongoose";

enum SessionPreferenceEnum {
  online = "online",
  offline = "offline",
}

const paidUserSchema = new mongoose.Schema<paidUserSchemaType>({
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
    enum: SessionPreferenceEnum,
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
    type: String
  },
  personalDetail: {
    fullName: { type: String, required: true },
    headline: { type: String },
  },
  socialDetail: {
    address: {
      colony: { type: String },
      city: { type: String },
    },
    phoneNumber: { type: String },
    gmail: { type: String },
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

const paidUser = mongoose.model<paidUserSchemaType>("PaidUser", paidUserSchema);

export { paidUser };
