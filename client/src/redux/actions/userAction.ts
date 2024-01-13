import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectUser } from "../slices/user/userSlice";
import { REGISTER_USER } from "../../graphql/mutation/user/registerUser";
import { SEND_OTP } from "../../graphql/mutation/otp/sendOtp";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const registerUser = async ({
    name,
    email,
    phoneNumber,
    isJobSeeker,
    occupation,
    sessionPreference,
    expectedSalary,
    collegeName,
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
          collegeName,
        },
      },
    });
    dispatch(actions.setRegisterUser(response.data));
    return {response};
  };

  const sendOtpApi = async (email: string) => {
    const response = await apolloClient.mutate({
      mutation: SEND_OTP,
      variables: {
        email,
      },
    });
    return {
      response,
      status: response?.data?.sendOtp?.response?.status,
    };
  };

  return { user, registerUser, sendOtpApi };
};
