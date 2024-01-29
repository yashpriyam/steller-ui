import { useDispatch, useSelector } from 'react-redux';
import { apolloClient } from '../../graphql/apolloClient/apolloClient';
import { GET_USER_CODE } from '../../graphql/query/userCode/getUserCode';
import { actions, selectUserCode } from '../slices/userCode/userCodeSlice';
import { SAVE_USER_CODE } from '../../graphql/mutation/userCode/saveUserCode';

export const useUserCode = () => {
  const dispatch = useDispatch();
  const userCodeData = useSelector(selectUserCode);

  const getUserCode = async () => {
    try {
      const response = await apolloClient.query({ query: GET_USER_CODE });
      dispatch(actions.setUserCode(response.data.getUserCode));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserCode = async ({
    questionId,
    weekNumber,
    dayNumber,
    code,
  }: userCodeType) => {
    try {
      const response = await apolloClient.mutate({
        mutation: SAVE_USER_CODE,
        variables: {
          input: {
            questionId,
            weekNumber,
            dayNumber,
            code,
          },
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { userCodeData, getUserCode, saveUserCode };
};
