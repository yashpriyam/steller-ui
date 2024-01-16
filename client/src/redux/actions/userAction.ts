import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectUser } from "../slices/user/userSlice";
import { REGISTER_USER } from "../../graphql/mutation/user/registerUser";
import { VERIFY_USER_OTP } from "../../graphql/mutation/user/verifyUserOtp";
import { UPDATE_USER_PASSWORD } from "../../graphql/mutation/updateUserPassword/updateUserPassword";
import { LOGIN } from "../../graphql/mutation/login/login";
import { SEND_OTP_REGISTER_USER } from "../../graphql/mutation/questionAttempt/sendUserOtp/sendUserOtp";
import { setCookie } from "../../utils/index";

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
    setCookie({
      key: process.env.REACT_APP_JWT_SECRET_KEY || "",
      value: response?.data?.registerUser?.credentials,
    });
    dispatch(actions.setRegisterUser(response.data));
    return { response };
  };

  const sendOtpApi = async (email: string) => {
    const response = await apolloClient.mutate({
      mutation: SEND_OTP_REGISTER_USER,
      variables: {
        email,
      },
    });
    return {
      response,
      status: response?.data?.sendOtpToRegisteredUser?.response?.status,
    };
  };

  const loginUserApi = async ({ email, password }: LoginUser) => {
    const response = await apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        data: {
          email,
          password,
        },
      },
    });
    setCookie({
      key: process.env.REACT_APP_JWT_SECRET_KEY || "",
      value: response?.data?.login?.credentials,
    });
    return response;
  };

  const verifyUserOtpApi = async (email: string, otp: string) => {
    const response = await apolloClient.mutate({
      mutation: VERIFY_USER_OTP,
      variables: {
        data: {
          email,
          emailOtp: otp,
        },
      },
    });
    setCookie({
      key: process.env.REACT_APP_JWT_SECRET_KEY || "",
      value: response?.data?.verifyUserOtp?.credentials,
    });
    return {
      response,
      status: response?.data?.verifyUserOtp?.credentials?.response?.status
    };
  };

  const updateUserPasswordApi = async (email: string, password: string) => {
    const response = await apolloClient.mutate({
      mutation: UPDATE_USER_PASSWORD,
      variables: {
        data: {
          email,
          password,
        },
      },
    });
    return {
      response,
    };
  };

  const setIsLoggedIn = (isLoggedIn: boolean) => {
    dispatch(actions.setIsLoggedIn(isLoggedIn));
  };

  return {
    user,
    registerUser,
    sendOtpApi,
    verifyUserOtpApi,
    updateUserPasswordApi,
    loginUserApi,
    setIsLoggedIn,
  };
};
