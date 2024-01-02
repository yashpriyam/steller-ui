import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectUserActivity } from "../slices/userActivity/userActivitySlice";
import { UPSERT_USER_ACTIVITY } from "../../graphql/mutation/userActivity/upsertUserActivity";

export const useUserActivity = () => {
  const dispatch = useDispatch();
  const userActivity = useSelector(selectUserActivity);

  const upsertUserActivity = async ({
    phoneNumber,
    isOpened,
  }: UserActivityDataType) => {
    const response = await apolloClient.mutate({
      mutation: UPSERT_USER_ACTIVITY,
      variables: {
        userActivityData: {
            phoneNumber,
            isOpened,
        },
      },
    });
    dispatch(actions.setUserActivity(response.data));
    return response;
  };

  return { userActivity, upsertUserActivity };
};
