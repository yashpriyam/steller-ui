import React, { ChangeEvent, useState } from "react";
import "./loginUI.scss";
import { LeftArrow } from "../index";
import { errorMessages } from "../../monorepoClient/helpers/constants/errorMessages";
import { LoginScreen } from "./loginScreen";
import { VerficationScreen } from "./verficationScreen";
import { CreatePasswordScreen } from "./createPasswordScreen";
import { Input } from "./input/inputComponent";

enum Screen {
  LOGIN_SCREEN,
  ENTER_EMAIL_OTP_SCREEN,
  CREATE_PASSWORD_SCREEN,
}

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
  const [currentScreen, setCurrentScreen] = useState(Screen.LOGIN_SCREEN);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  console.log(userData);
  
  
  const handleLoginClick = () => {
    if (!userData.email.trim() || !userData.password.trim()) {
      setError(`${errorMessages.LOGIN.ENTER_EMAIL_AND_PASSWORD}`);
      return;
    }
    setError("");
  };

  const handleInputChange = () => {
    setError("");
  };

  const handleLoginWithOTP = () => {
    setUserData({
      email: "",
      password: "",
    });
    setOtp("");
    setCurrentScreen(Screen.ENTER_EMAIL_OTP_SCREEN);
  };


  const handleVerifyOTP = () => {
    if (!otp.trim() || !userData.email.trim()) {
      setError(`${errorMessages.VERIFICATION.ENTER_EMAIL_AND_OTP}`);
      return;
    }
    setError("");
    setCurrentScreen(Screen.CREATE_PASSWORD_SCREEN);
  };

  const handelSkip = () => {
    setUserData({
      email: "",
      password: "",
    });
    setCurrentScreen(Screen.LOGIN_SCREEN);
  };

  const handleBackArrow = () => {
    setUserData({...userData,email:""});
    setCurrentScreen(Screen.LOGIN_SCREEN);
  };
  const handleOnCreateNewPassword = (password:string) => {
    setUserData({ ...userData, password: password })
    setCurrentScreen(Screen.LOGIN_SCREEN)
  }
  const renderScreen: React.FC = (currentScreen) => {
    switch (currentScreen) {
      case Screen.LOGIN_SCREEN:
        return (
          <LoginScreen
            userData={userData}
            setUserData={setUserData}
            handleInputChange={handleInputChange}
            handleLoginClick={handleLoginClick}
            handleLoginWithOTP={handleLoginWithOTP}
          />
        );
      case Screen.ENTER_EMAIL_OTP_SCREEN:
        return (
          <VerficationScreen
            email={userData.email}
            setUserData={setUserData}
            otp={otp}
            setOtp={setOtp}
            handleInputChange={handleInputChange}
            handleBackArrow={handleBackArrow}
            handleVerifyOTP={handleVerifyOTP}
          />
        );
      case Screen.CREATE_PASSWORD_SCREEN:
        return (
          <CreatePasswordScreen
            handleOnCreateNewPassword={handleOnCreateNewPassword}
            handelSkip={handelSkip}
          />
        );
      default:
        return null;
    }
  };
  const setOtpValue = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };
  return (
    <div className={`main ${className}`} style={{ ...style }}>
      <div
        className="login-page"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <Input type="text" placeholder="enter name" value={otp} onChange={setOtpValue}/>
        {error && <div className="error-text">{error}</div>}
      </div>
    </div>
  );
};
