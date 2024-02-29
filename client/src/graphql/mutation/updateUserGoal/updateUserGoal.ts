import { gql } from "@apollo/client";

export const UPDATE_USER_GOAL = gql`
  mutation UpdateUserGoalCompletion($input: UpdateUserGoalCompletionInput!) {
    updateUserGoalCompletion(input: $input) {
      response {
        status
        message
      }
      userGoalCompletion {
        profileType
        userResponse
        id
      }
    }
  }
`;