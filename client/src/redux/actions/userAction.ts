import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectUser } from "../slices/user/userSlice";
import { REGISTER_USER } from "../../graphql/mutation/user/registerUser";
import { VERIFY_USER_OTP } from "../../graphql/mutation/user/verifyUserOtp";
import { UPDATE_USER_PASSWORD } from "../../graphql/mutation/updateUserPassword/updateUserPassword";
import { LOGIN } from "../../graphql/mutation/login/login";
import { SEND_OTP_REGISTER_USER } from "../../graphql/mutation/questionAttempt/sendUserOtp/sendUserOtp";
import { setCookie } from "../../utils/index";
import { UPDATE_USER_INFO } from "../../graphql/mutation/user/updateUserInfo";
import { GET_USER } from "../../graphql/mutation/user/getUser";
import { CREATE_USER_PAYMENTS } from "../../graphql/mutation/userPayments/createUserPayment";
import { useState } from "react";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async ({
    name,
    email,
    phoneNumber,
    isJobSeeker,
    occupation,
    sessionPreference,
    expectedSalary,
    collegeName,
    courseYear,
    course,
    branch,
    location,
    batchCode,
    profileImage,
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
          courseYear,
          course,
          branch,
          location,
          batchCode,
          profileImage,
        },
      },
    });
    const status = response?.data?.registerUser?.response?.status;
    if (status === 200) {
      setCookie({
        key: process.env.REACT_APP_JWT_SECRET_KEY || "",
        value: response?.data?.registerUser?.credentials,
      });
      dispatch(actions.setRegisterUser(response.data));
    }
    return { response, status };
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
    const status = response?.data?.login?.response?.status;
    if (status === 200) {
      setCookie({
        key: process.env.REACT_APP_JWT_SECRET_KEY || "",
        value: response?.data?.login?.credentials,
      });
    }
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
    const status = response?.data?.verifyUserOtp?.response?.status;
    if (status === 200) {
      setCookie({
        key: process.env.REACT_APP_JWT_SECRET_KEY || "",
        value: response?.data?.verifyUserOtp?.credentials,
      });
    }
    return {
      response,
      status: response?.data?.verifyUserOtp?.response?.status,
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

  const updateUserInfo = async (input: UpdateUserInput) => {
    try {
      setIsLoading(true)
      const response = await apolloClient.mutate({
        mutation: UPDATE_USER_INFO,
        variables: {
          input: {
            ...input,
          },
        },
      });
     
      dispatch(actions.setUser(response.data.updateUser));
      return {
        response,
      };
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  };

  const getUserData = async () => {
    try {
      const response = await apolloClient.query({
        query: GET_USER,
      });
      dispatch(actions.setUser(response.data.getUser));
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const createUserPayment = async (input: UserPaymentInputType) => {
    try {
      const response = await apolloClient.mutate({
        mutation: CREATE_USER_PAYMENTS,
        variables: {
          input: {
            ...input,
          },
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    registerUser,
    sendOtpApi,
    verifyUserOtpApi,
    updateUserPasswordApi,
    loginUserApi,
    setIsLoggedIn,
    updateUserInfo,
    getUserData,
    createUserPayment,
    isLoading
  };
};
