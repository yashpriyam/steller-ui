import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { LOGIN } from "../../graphql/mutation/login/login";
import { SEND_OTP_PAID_USER } from "../../graphql/mutation/sendOtpPaidUser/sendOtpPaidUser";
import { VERIFY_OTP_PAID_USER } from "../../graphql/mutation/verifyOtpPaidUser/verifyOtpPaidUser";
import { UPDATE_PAID_USER_PASSWORD } from "../../graphql/mutation/updatePaidUserPassword/updatePaidUserPassword";

export const useLogin = () => {
  const loginUser = async ({ email, password }: LoginUser) => {
    const response = await apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        data: {
          email,
          password,
        },
      },
    });
    return response;
  };
  const sendOtpPaidUserApi = async (email: string) => {
    const response = await apolloClient.mutate({
      mutation: SEND_OTP_PAID_USER,
      variables: {
        email,
      },
    });
    return {
      response,
    };
  };
  const verifyOtpPaidUserApi = async (email: string, otp: string) => {    
    const response = await apolloClient.mutate({
      mutation: VERIFY_OTP_PAID_USER,
      variables: {
        data: {
          email,
          emailOtp:otp,
       }
      },
    });    
    return {
      response,
    };
  };
  const updatePaidUserPasswordApi = async (email: string, password: string) => {       
     const response = await apolloClient.mutate({
       mutation: UPDATE_PAID_USER_PASSWORD,
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
  return {
    loginUser,
    sendOtpPaidUserApi,
    verifyOtpPaidUserApi,
    updatePaidUserPasswordApi,
  };
}; 
