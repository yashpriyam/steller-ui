import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectUser } from "../slices/user/userSlice";
import { REGISTER_USER } from "../../graphql/mutation/user/registerUser";



export const useUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);

  const registerUser = async ({
    name,
    email,
    phoneNumber,
    isJobSeeker,
    occupation,
    sessionPreference,
    expectedSalary,
    emailOtp,
    collegeName
  }: RegisterUserData) => {
    const response = await apolloClient.mutate({
      mutation: REGISTER_USER,
      variables: {
        data: {
          name,
          email,
          phoneNumber,
          isJobSeeker,
          occupation,
          sessionPreference,
          expectedSalary,
          emailOtp,
          collegeName,
        },
      },
    });
    dispatch(actions.setItems(response.data));
    return response;
  };
  return { users, registerUser };
};
