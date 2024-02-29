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


const leetCodeUserProfileModel = mongoose.model('LeetCodeUserProfile', leetCodeUserProfileSchema);


export { leetCodeUserProfileModel };