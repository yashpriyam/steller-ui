import { useQuery } from "@apollo/client";
import React from "react";
import Spinner from "../../components/spinner/spinner";
import "./leaderboard.scss";
import { GET_LEADERBOARD_DATA } from "../../graphql/query/leaderboard/getLeaderboardData";
import { Star } from "../../icons/star";
import { GET_LEETCODE_LEADERBOARD } from "../../graphql/query/leaderboard/getLeetcodeLeaderBoard";

const LeaderBoard = () => {
  const { data: leaderboardData, loading } = useQuery(GET_LEADERBOARD_DATA);
  const { data: leetcodeData } = useQuery(GET_LEETCODE_LEADERBOARD);
  
  const userData: UserSchemaType[] = leetcodeData?.getLeetCodeLeaderboardData?.users;
  
   const completedGoalObj: { [key: string]: UserSchemaType } = {};

  userData?.forEach((data) => {
    completedGoalObj[data._id] = data;
  })
  
  // Filter the data to get only the user with rank 1
  const firstPlaceUser = leaderboardData?.getLeaderBoardData?.find(
    (data: any, idx: number) => idx === 0
  );

  return (
    <div className="leaderboardContainer">
      {loading ? (
        <Spinner />
      ) : (
        <div className="leaderboard">
          <table className="leaderboardTable ">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>HTML,CSS Submissions</th>
                <th>DSA Submissions</th>
              </tr>
            </thead>
            <tbody className="table-container">
              {leaderboardData?.getLeaderBoardData?.map(
                (data: any, idx: number) => (
                  <tr key={data._id}>
                    <td>
                      {idx + 1}
                      {idx === 0 && (
                        <div className="star">
                          <Star />
                        </div>
                      )}
                    </td>
                    <td className="userProfile">
                      {data?.user?.profileImage ? (
                        <img
                          src={data?.user.profileImage.secureUrl}
                          alt={data?.user.name}
                          className="profileImage"
                        />
                      ) : (
                        <div className="profileImage"></div>
                      )}
                      <span className="userName">{data?.user.name}</span>
                    </td>
                    <td>{data.totalSubmissions}</td>
                    <td>{completedGoalObj[data?.user?._id]?.recentSubmissions?.length||0}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
