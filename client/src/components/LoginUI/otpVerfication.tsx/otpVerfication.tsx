import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { LeftArrow } from "../../index";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../../input/inputComponent";
import { Button } from "../../button/button";
import { isValidEmail } from "../../../utils/isValidEmail";
import "./otpVerification.scss"

interface LoginWithOtpComponent {
  handleOnSendOtp: (email: string) => void;
  verifyOtp: (userInfo: object)=> boolean;
  onBackClick: () => void;
}

export const LoginWithOtpComponent: React.FC<LoginWithOtpComponent> = ({
  handleOnSendOtp,
  verifyOtp,
  onBackClick,
}) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({ email: "", otp: "" });
  const [otp, setOtp] = useState({ isOtpSend: false, isOtpValid: false });
  const [error, setError] = useState("");

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((userData) => {
      return { ...userData, email: e.target.value };
    });
  };
  const handleOtpInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUserData( { ...userData, otp: e.target.value });
  };
  const handleOnSendOtpClick = () => {
    const validEmail = isValidEmail(userData.email);
    validEmail&&handleOnSendOtp(userData.email);
    setOtp({...otp,isOtpSend:validEmail});
  };
  const handleOnVerifyOtp = () => {
    const otpValid = verifyOtp(userData);
    setError(otpValid ? "" : "The entered OTP is invalid. Please try again.");
    setOtp({ ...otp, isOtpValid: otpValid });
    setUserData({ ...userData, otp: "" });
    
  };
  const handleOnResendOtp = () => {
    const validEmail = isValidEmail(userData.email);
    validEmail && handleOnSendOtp(userData.email);
    setUserData({ ...userData, otp: "" });
    setError("");
  }
  return (
    <div className="verification-page-wrapper">
      <div className="back-arrow">
        <LeftArrow onClick={onBackClick} />
      </div>
      <h1 className="heading-container">{t("Verification")}</h1>
      <InputComponent
        type="email"
        className="input-component"
        value={userData.email}
        placeholder="Enter userId"
        onChange={handleEmailInputChange}
        errorMessage="enter valid email"
      />
      <InputComponent
        className="input-component"
        type="number"
        value={userData.otp}
        placeholder="Enter otp"
        onChange={handleOtpInputChange}
        disabled={!otp.isOtpSend}
      />
      <div className="button-container">
        <Button
          text={otp.isOtpSend ? "verify otp" : "send otp"}
          className="send-verify-otp"
          onClick={otp.isOtpSend ? handleOnVerifyOtp : handleOnSendOtpClick}
          isDisabled={otp.isOtpSend&&!Boolean(userData.otp)}
        /> 
        {otp.isOtpSend && (
          <Button
            className="send-verify-otp"
            text="resend"
            onClick={handleOnResendOtp}
          />
        )}
      </div>
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};
