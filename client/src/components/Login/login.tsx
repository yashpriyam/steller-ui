import React, { useState } from "react";
import "./login.scss";
import { OtpVerification } from "../otpVerfication/otpVerfication";
import { CreatePassword } from "../createPassword/createPassword";
import { LoginComponent } from "../loginComponent/loginComponent";

export const Login: React.FC<LoginProps> = ({
  className,
  style,
  bgColor,
  textColor,
}: LoginProps) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });  
  const presentScreen: Record<string, string> = {
    CREATE_PASSWORD: "CREATE_PASSWORD",
    OTP_VERIFICATION: "FORGET_PASSWORD",
    LOGIN: "LOGIN",
  };
  const handleLoginClick = (email: string, password: string): boolean => {
    setUserData({ email, password });
    return false;
  };
  const handleOnForgetPasswordClick = () => {
    console.log(screen[presentScreen.OTP_VERIFICATION]);
    
    setCurrentScreen(screen[presentScreen.OTP_VERIFICATION]);
  };
  const handleOnSendOtp = (email: string) => {};

  const handleOnVerifyOtp = (userInfo: object): boolean => {
    const isValidOtp = true;
    isValidOtp && setCurrentScreen(screen[presentScreen.CREATE_PASSWORD]);
    return isValidOtp;
  };
  const onBackClick = () => {
    setCurrentScreen(screen[presentScreen.LOGIN]);
  };
  const handleOnCreateNewPassword = (password: string) => {
    setUserData({ ...userData, password: password });
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
  const [currentScreen, setCurrentScreen] = useState(
    screen[presentScreen.LOGIN]
  );
  return (
    <div
      className={`login-wrapper-container ${className}`}
      style={{ ...style }}
    >
      <div
        className="login-page"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {currentScreen}
      </div>
    </div>
  );
};
