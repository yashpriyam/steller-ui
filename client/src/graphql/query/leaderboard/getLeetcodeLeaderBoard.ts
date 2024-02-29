import { gql } from "@apollo/client";

export const GET_LEETCODE_LEADERBOARD = gql`
  query Query {
    getLeetCodeLeaderboardData {
      users {
        email
        name
        _id
        socialLinks
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
