import React, { useState } from "react";
import "./login.scss";
import { useSelector } from "react-redux";
import { OtpVerification } from "../otpVerfication/otpVerfication";
import { CreatePassword } from "../createPassword/createPassword";
import { LoginComponent } from "../loginComponent/loginComponent";
import { useLogin } from "../../redux/actions/loginAction";
export const Login: React.FC<LoginProps> = ({
  className,
  style,
  bgColor,
  textColor,
}: LoginProps) => {
  const {
    loginUser,
    sendOtpPaidUserApi,
    verifyOtpPaidUserApi,
    updatePaidUserApi,
  } = useLogin();
  const currentData: LoginState = useSelector((state: any) => state.login);
  const presentScreen: Record<string, string> = {
    CREATE_PASSWORD: "CREATE_PASSWORD",
    OTP_VERIFICATION: "FORGET_PASSWORD",
    LOGIN: "LOGIN",
  };
  const handleLoginClick = async (): Promise<boolean> => {
    try {
      const response = await loginUser({
        email: currentData.email,
        password: currentData.password,
      });
      return response.data.login.response.status === 200;
    } catch (error) {
      return false;
    }
  };
  const handleOnForgetPasswordClick = () => {
    setCurrentScreen(presentScreen.OTP_VERIFICATION);
  };

  const handleOnSendOtp = async (): Promise<boolean> => {
    const response = await sendOtpPaidUserApi(currentData.email);
    return response.response?.data?.sendOtpToPaidUser.status === 200;
  };

  const handleOnVerifyOtp = async (otp: string): Promise<boolean> => {
    try {
      const response = await verifyOtpPaidUserApi(currentData.email, otp);
      const isValidOtp =
        response.response.data.verifyOtpPaidUser.status === 200;
      isValidOtp && setCurrentScreen(presentScreen.CREATE_PASSWORD);
      return isValidOtp;
    } catch (error) {
      return false;
    }
  };
  const onBackClick = () => {
    setCurrentScreen(presentScreen.LOGIN);
  };
  const handleOnCreateNewPassword = async () => {
    try {
      const updatedNewData: UpdatePaidDataType = {
        password: currentData.password,
      };
       const response = await updatePaidUserApi(
         currentData.email,
         updatedNewData
      );
      const isDataUpdated=response?.response.data.updatePaidUser.response.status;
      
    } catch (error) {}
  };
  const screen: Record<string, React.ReactNode> = {
    LOGIN: (
      <LoginComponent
        handleLoginClick={handleLoginClick}
        handleOnForgetPasswordClick={handleOnForgetPasswordClick}
      />
    ),
    FORGET_PASSWORD: (
      <OtpVerification
        handleOnSendOtp={handleOnSendOtp}
        verifyOtp={handleOnVerifyOtp}
        onBackClick={onBackClick}
      />
    ),
    CREATE_PASSWORD: (
      <CreatePassword
        handleSkip={onBackClick}
        handleOnCreateNewPassword={handleOnCreateNewPassword}
      />
    ),
  };
  const [currentScreen, setCurrentScreen] = useState(presentScreen.LOGIN);
  return (
    <div
      className={`login-wrapper-container ${className}`}
      style={{ ...style }}
    >
      <div
        className="login-page"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {screen[currentScreen]}
      </div>
    </div>
  );
};
