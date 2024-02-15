import { userCodeModel } from '@models';


export const getLeaderBoardData = async (
  parent: undefined,
  args: undefined,
  { contextData }: ContextType
): Promise<LeaderBoardData[] | undefined | unknown> => {
  try {

    const leaderBoardData: LeaderBoardData[] = await userCodeModel.aggregate([
        {
          $lookup: {
            from: "users", 
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $group: {
            _id: "$userId",
            user: { $first: "$user" },
            submissions: { $push: "$$ROOT" }, 
            totalSubmissions: { $sum: 1 } 
          }
        },
        {
          $sort: { totalSubmissions: -1 } 
        }
      ]);

    if (Boolean(leaderBoardData?.length)) {
        return leaderBoardData
    }

  } catch (error) {
    return error
  }
};
