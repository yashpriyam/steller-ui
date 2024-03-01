import { gql } from "@apollo/client";

export const GET_All_USER_GOALS = gql`
  query GetAllUserGoals {
    getAllUserGoals {
      userGoals {
        _id
        isVerified
        goalId {
          _id
        }
      }
      response {
        status
        message
      }
    }
  }
`; 