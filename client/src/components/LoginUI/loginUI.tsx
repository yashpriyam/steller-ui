import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./loginUI.scss";
import {LeftArrow} from "../index";
import { errorMessages } from "../../monorepoClient/helpers/constants/errorMessages";
import { LoginScreen } from "./loginScreen";
import { VerficationScreen } from "./verficationScreen";
import { CreatePasswordScreen } from "./createPasswordScreen";

enum Screen {
  LOGIN_SCREEN,
  ENTER_EMIAL_OTP_SCREEN,
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
    textColor
}: LoginUIProps) => {
  const [currentScreen, setCurrentScreen] = useState(Screen.LOGIN_SCREEN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState('');

  const {t} = useTranslation();

  const handleLoginClick = () => {
    if (!email.trim() || !password.trim()) {
      setError(`${errorMessages.LOGIN.ENTER_EMAIL_AND_PASSWORD}`);
      return;
    }
    setError('');
  };

  const handleInputChange = () => {
    setError('');
  };

  const handleLoginWithOTP = () => {
    setEmail('')
    setPassword('')
    setOtp('')
    setCurrentScreen(Screen.ENTER_EMIAL_OTP_SCREEN);
  };

  const handleVerifyOTP = () => {
    if (!otp.trim() || !email.trim()) {
      setError(`${errorMessages.VERIFICATION.ENTER_EMAIL_AND_OTP}`);
      return;
    }
    setError('');
    setCurrentScreen(Screen.CREATE_PASSWORD_SCREEN);
  };

  const handelSkip = () => {
    setEmail('')
    setPassword('')
    setCurrentScreen(Screen.LOGIN_SCREEN);
  };

  const handleBackArrow = ()=>{
    setEmail('')
    setCurrentScreen(Screen.LOGIN_SCREEN);
  }
  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN_SCREEN:
        return <LoginScreen t={t} email={email} setEmail={setEmail} password={password} setPassword = {setPassword} handleInputChange={handleInputChange} handleLoginClick={handleLoginClick} handleLoginWithOTP={handleLoginWithOTP}/>
      case Screen.ENTER_EMIAL_OTP_SCREEN:
        return <VerficationScreen t={t} email={email} setEmail={setEmail} otp={otp} setOtp={setOtp} handleInputChange={handleInputChange} handleBackArrow={handleBackArrow} handleVerifyOTP={handleVerifyOTP}/>
      case Screen.CREATE_PASSWORD_SCREEN:
        return <CreatePasswordScreen t={t} newPassword={newPassword} setNewPassword={setNewPassword} handelSkip={handelSkip}/>
      default:
        return null;
    }
  };
  return (
    <div className={`main ${className}`} style={{...style}}>
      <div className="login-page" style={{backgroundColor: bgColor, color: textColor}}>
        {renderScreen()}
        {error && <div className="error-text">{error}</div>}
      </div>
    </div>
  );
};


