import { LeetCodeUserProfile, RecentSubmission, User } from "@models";
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
        let leetCodeProfile = await LeetCodeUserProfile.findOne({
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
            leetCodeProfile = new LeetCodeUserProfile({
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
        const recentACSubmissions =
          recentSubmissionsData.recentAcSubmissionList;

        for (const submission of recentACSubmissions) {
          // Check if submission ID already exists for the user
          const existingSubmission = await RecentSubmission.findOne({
            id: submission.id,
          });

          // If submission ID doesn't exist, add it to recent submissions
          if (!existingSubmission) {
            const newSubmission = new RecentSubmission({
              id: submission.id,
              title: submission.title,
              titleSlug: submission.titleSlug,
              timestamp: submission.timestamp,
            });
            // Save the new submission
            await newSubmission.save();

            // Push the new submission object into the user's recentSubmissions array
            if (newSubmission) {
              user?.recentSubmissions?.push(newSubmission as any);
            }
          }
        }

        // Save the changes to the user document
        await user.save();
      }
    }
    console.log("user updated with leetcode data");
    
  } catch (error) {
    console.error({ error });
  }
};
