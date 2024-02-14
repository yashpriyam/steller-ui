import { useQuery } from "@apollo/client";
import React from "react";
import Spinner from "../../components/spinner/spinner";
import "./leaderboard.scss";
import { GET_LEADERBOARD_DATA } from "../../graphql/query/leaderboard/getLeaderboardData";
import { Star } from "../../icons/star";

const LeaderBoard = () => {
  const { data: leaderboardData, loading } = useQuery(GET_LEADERBOARD_DATA);


   // Filter the data to get only the user with rank 1
   const firstPlaceUser = leaderboardData?.getLeaderBoardData?.find(
    (data: any, idx: number) => idx === 0
  );
  return (
    <div className="leaderboardContainer">
      <h1 className="leaderboardTitle">Leaderboard</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="leaderboard">
            {/* will use this section later */}
        {/* <div className="firstPlaceUser">
            <h2 className="firstPlaceTitle">First Place</h2>
            <div className="userProfile">
              {firstPlaceUser?.user?.profileImage ? (
                <img
                  src={firstPlaceUser.user.profileImage.secureUrl}
                  alt={firstPlaceUser.user.name}
                  className="profileImage"
                />
              ) : (
                <div className="profileImage"></div>
              )}
              <span className="userName">{firstPlaceUser?.user.name}</span>
            </div>
            <p className="total-submissions">Total Submissions: {firstPlaceUser?.totalSubmissions}</p>
          </div> */}
      
        <table className="leaderboardTable">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Submissions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.getLeaderBoardData?.map(
              (data: any, idx: number) => (
                <tr key={data._id}>
                  <td>
                    {idx + 1}
                    {
                    idx === 0 && (
                        <div className="star">
                            <Star/>
                        </div>
                    )
                  }
                  </td>
                 
                  <div className="userProfile">
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
                  </div>
                  <td>{data.totalSubmissions}</td>
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
