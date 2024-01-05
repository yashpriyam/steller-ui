import React, { ChangeEvent, useState } from "react";
import "./loginUI.scss";
import { LeftArrow } from "../index";
import { errorMessages } from "../../monorepoClient/helpers/constants/errorMessages";
import { LoginWithOtpComponent } from "./otpVerfication.tsx/otpVerfication";
import { CreatePassword } from "./createPassword.tsx/createPasswordScreen";
import { LoginComponent } from "./loginComponent/loginComponent";

export interface LoginUIProps {
  className?: string;
  style?: React.CSSProperties;
  bgColor?: string;
  textColor?: string;
}

export const LoginUI: React.FC<LoginUIProps> = ({
  className,
  style,
  bgColor,
  textColor,
}: LoginUIProps) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleLoginClick = (userId: string, password: string) => {
    setUserData({ email: userId, password: password });
  };
  const handleOnForgetPasswordClick = () => {
    setCurrentScreen(Screen["LOGIN_WITH_OTP"]);
  };
  const handleOnLoginWithOtpClick = () => {
    setCurrentScreen(Screen["LOGIN_WITH_OTP"]);
  };
  const handleOnSendOtp = (email: string) => {};

  const handleOnVerifyOtp = (userInfo: object): boolean => {
    const isValidOtp = true;
    isValidOtp && setCurrentScreen(Screen["CREATE_PASSWORD"]);
    return isValidOtp;
  };
  const onBackClick = () => {
    setCurrentScreen(Screen["LOGIN"]);
  };
  const handleOnCreateNewPassword = (password: string) => {
    setUserData({...userData, password: password });
  }
  const Screen: Record<string, any> = {
    LOGIN: (
      <LoginComponent
        handleLoginClick={handleLoginClick}
        handleOnForgetPasswordClick={handleOnForgetPasswordClick}
        handleOnLoginWithOtpClick={handleOnLoginWithOtpClick}
      />
    ),
    LOGIN_WITH_OTP: (
      <LoginWithOtpComponent
        handleOnSendOtp={handleOnSendOtp}
        verifyOtp={handleOnVerifyOtp}
        onBackClick={onBackClick}
      />
    ),
    CREATE_PASSWORD: (
      <CreatePassword
        handelSkip={onBackClick}
        handleOnCreateNewPassword={handleOnCreateNewPassword}
      />
    ),
  };
  const [currentScreen, setCurrentScreen] = useState(Screen["LOGIN"]);
  return (
    <div className={`main ${className}`} style={{ ...style }}>
      <div
        className="login-page"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {currentScreen}
      </div>
    </div>
  );
};

{
}
