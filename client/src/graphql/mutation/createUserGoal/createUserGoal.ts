import { gql } from "@apollo/client";

export const CREATE_USER_GOAL = gql`
mutation CreateUserGoalCompletion($input: UserGoalCompletionInput!) {
    createUserGoalCompletion(input: $input) {
      userGoalCompletion {
        id
        completedAt
        userResponse
        weekNumber
        createdAt
        updatedAt
      }
      response {
        message
        status
      }
    }
  }
  
`;