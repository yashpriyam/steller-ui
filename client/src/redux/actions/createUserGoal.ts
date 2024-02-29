import { useState } from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { CREATE_USER_GOAL } from "../../graphql/mutation/createUserGoal/createUserGoal";
import { UPDATE_USER_GOAL } from "../../graphql/mutation/updateUserGoal/updateUserGoal";

export const useUserGoalsMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUserGoal = async (userResponse: string, goalId: string, profileType?: string) => {
    try {
      setIsLoading(true);
      const response = await apolloClient.mutate({
        mutation: CREATE_USER_GOAL,
        variables: {
          input: {
            goalId,
            userResponse: {
              response: userResponse,
            },
            profileType
          },
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const updateUserGoal = async (
    userResponse: string,
    id: String,
    profileType?: string
  ) => {
    try {
      setIsLoading(true);
      const response = await apolloClient.mutate({
        mutation: UPDATE_USER_GOAL,
        variables: {
          input: {
            id,
            response: {
              response: userResponse,
            },
            profileType,
          },
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUserGoal,
    updateUserGoal,
    isLoading,
  };
};
