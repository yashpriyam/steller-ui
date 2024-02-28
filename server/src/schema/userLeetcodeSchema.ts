import mongoose from "mongoose";

const leetCodeUserProfileSchema = new mongoose.Schema({
  username: { type: String, required: false },
  submitStats: {
    acSubmissionNum: [{
      difficulty: String,
      count: Number,
      submissions: Number
    }]
  }
});

// Define a schema for storing recent submission data
const recentSubmissionSchema = new mongoose.Schema({
  id: { type: String, required: false },
  title: { type: String, required: false },
  titleSlug: { type: String, required: false },
  timestamp: { type: String, required: false }
});

const LeetCodeUserProfile = mongoose.model('LeetCodeUserProfile', leetCodeUserProfileSchema);
const RecentSubmission = mongoose.model('RecentSubmission', recentSubmissionSchema);

export { LeetCodeUserProfile, RecentSubmission };