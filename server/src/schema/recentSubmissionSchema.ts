import mongoose from "mongoose";


// Define a schema for storing recent submission data
const recentSubmissionSchema = new mongoose.Schema({
    id: { type: String, required: false },
    title: { type: String, required: false },
    titleSlug: { type: String, required: false },
    timestamp: { type: String, required: false }
  });

  const recentSubmissionModel = mongoose.model('RecentSubmission', recentSubmissionSchema);

  export { recentSubmissionModel };