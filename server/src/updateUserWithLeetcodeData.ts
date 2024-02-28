import { leetCodeUserProfileModel, recentSubmissionModel, User } from "@models";
import { executeGraphQLQuery } from "@utils";
import {
  GET_RECENT_AC_SUBMISSIONS,
  GET_USER_LEETCODE_PROFILE,
} from "./graphql/RowQueries/index";

export const updateUserWithLeetCodeData = async () => {
  try {
    const users = await User.find({
      feePlan: { $exists: true },
      socialLinks: { $exists: true },
    },{
        socialLinks: 1,
        leetCodeUserProfile: 1,
        recentSubmissions: 1
    });
   
    for (const user of users) {
      const socialLinks = user.socialLinks as Record<string, any>;

      if (socialLinks && socialLinks.LeetCode) {
        let leetCodeUserId = socialLinks.LeetCode.response.replace(
          "https://leetcode.com/",
          ""
        );
        leetCodeUserId = leetCodeUserId.replace(/\/$/, "");

        // Check if LeetCode user profile already exists
        let leetCodeProfile = await leetCodeUserProfileModel.findOne({
          username: leetCodeUserId,
        });

        if (!leetCodeProfile) {
          // If LeetCode user profile doesn't exist, fetch it from GraphQL API
          const data = await executeGraphQLQuery(GET_USER_LEETCODE_PROFILE, {
            username: leetCodeUserId,
          });

          const matchedUser = data.matchedUser;
          if (matchedUser) {
            // Create new LeetCode user profile if it doesn't exist
            leetCodeProfile = new leetCodeUserProfileModel({
              username: matchedUser.username,
              submitStats: matchedUser.submitStats,
            });
            await leetCodeProfile.save();
          }
        } else {
          // Update LeetCode user profile if it already exists
          const data = await executeGraphQLQuery(GET_USER_LEETCODE_PROFILE, {
            username: leetCodeUserId,
          });

          const matchedUser = data.matchedUser;
          if (matchedUser) {
            leetCodeProfile.username = matchedUser.username;
            leetCodeProfile.submitStats = matchedUser.submitStats;
            await leetCodeProfile.save();
          }
        }

        // Associate the LeetCode profile with the corresponding user
        if (leetCodeProfile) {
          user.leetCodeUserProfile = leetCodeProfile._id;
          await user.save();
        }

        // Fetch recent AC submissions
        const recentSubmissionsData = await executeGraphQLQuery(
          GET_RECENT_AC_SUBMISSIONS,
          {
            username: leetCodeUserId,
            limit: 100,
          }
        );
        const recentACSubmissions = recentSubmissionsData.recentAcSubmissionList;

        // Extract recent submissions data to be inserted
        const recentSubmissionsToInsert = recentACSubmissions.map(
          (submission: RecentSubmissionDocument) => ({
            id: submission.id,
            title: submission.title,
            titleSlug: submission.titleSlug,
            timestamp: submission.timestamp,
          })
        );

        // Find existing submissions
        const existingSubmissions = await recentSubmissionModel.find({
          id: {
            $in: recentSubmissionsToInsert.map((submission: RecentSubmissionDocument) => submission.id),
          },
        });

        // Filter out existing submissions
        const newSubmissionsToInsert = recentSubmissionsToInsert.filter(
          (submission: RecentSubmissionDocument) =>
            !existingSubmissions.some(
              (existingSubmission) => existingSubmission.id === submission.id
            )
        );

        // Insert new submissions
        if (newSubmissionsToInsert.length > 0) {
          await recentSubmissionModel.insertMany(newSubmissionsToInsert);
        }

        // Update user's recentSubmissions array with new submission IDs
        const newSubmissionIds = newSubmissionsToInsert.map(
          (submission: RecentSubmissionDocument) => submission._id
        );
        user.recentSubmissions?.push(...newSubmissionIds);
        await user.save();
      }
    }
    console.log("user updated with leetcode data");
  } catch (error) {
    console.error({ error });
  }
};
