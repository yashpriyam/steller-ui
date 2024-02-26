import { useState } from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { CREATE_USER_GOAL } from "../../graphql/mutation/createUserGoal/createUserGoal";

export const useUserGoals = () => {
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

  return {
    createUserGoal,
    isLoading,
  };
};
