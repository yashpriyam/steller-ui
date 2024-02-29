import { gql } from "@apollo/client";

export const GET_LEETCODE_LEADERBOARD = gql`
  query Query {
    getLeetCodeLeaderboardData {
      users {
        name
        _id
        leetCodeUserProfile
        recentSubmissions {
          _id
          id
          title
          titleSlug
          timestamp
        }
      }
      response {
        status
        message
      }
    }
  }
`;
