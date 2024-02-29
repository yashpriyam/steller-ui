import { statusCodes } from "@constants";
import { User } from "@models";

export const getLeetCodeLeaderboardData = async (
  parent: undefined,
  args: undefined,
  { contextData }: ContextType
): Promise<LeetCodeLeaderboardDataType | undefined | unknown> => {
  try {
    const users = await User.find({
      feePlan: { $exists: true },
      socialLinks: { $exists: true },
    })
      .select("_id name")
      .populate("recentSubmissions leetCodeUserProfile");

    // Sort users based on the length of recentSubmissions array in descending order
    users.sort(
      (a, b) => b.recentSubmissions!.length - a.recentSubmissions!.length
    );

    return {
      users: users,
      response: {
        status: statusCodes.OK
      }
    };
  } catch (error) {
    console.error(error)
    return {
        response: {
            status: statusCodes.BAD_REQUEST,
        }
    }
  }
};
