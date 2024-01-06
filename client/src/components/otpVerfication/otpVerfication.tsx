import React, { ChangeEvent,useState } from "react";
import LeftArrow  from "../../icons/LeftArrow";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/button";
import { isValidEmail } from "../../utils/isValidEmail";
import "./otpVerification.scss";

export const OtpVerification: React.FC<OtpVerificationProps> = ({
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
    setUserData({ ...userData, otp: e.target.value });
  };
  const handleOnSendOtpClick = () => {
    const validEmail = isValidEmail(userData.email);
    validEmail && handleOnSendOtp(userData.email);
    setOtp({ ...otp, isOtpSend: validEmail });
  };
  const handleOnVerifyOtpClick = () => {
    const isOtpValid = verifyOtp(userData);
    setError(
      isOtpValid ? "" : t("The entered OTP is invalid. Please try again.")
    );
    setOtp({ ...otp, isOtpValid });
    setUserData({ ...userData, otp: "" });
  };
  const handleOnResendOtpClick = () => {
    const validEmail = isValidEmail(userData.email);
    validEmail && handleOnSendOtp(userData.email);
    setUserData({ ...userData, otp: "" });
    setError("");
  };
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
        placeholder={t("Enter email address")}
        onChange={handleEmailInputChange}
        errorMessage={t("Invalid email, enter valid email")}
      />
      <InputComponent
        className="input-component"
        type="number"
        value={userData.otp}
        placeholder={t("Enter otp")}
        onChange={handleOtpInputChange}
        disabled={!otp.isOtpSend}
      />
      <div className="button-container">
        <Button
          text={otp.isOtpSend ? t("verify otp") : t("send otp")}
          className="send-verify-otp"
          onClick={
            otp.isOtpSend ? handleOnVerifyOtpClick : handleOnSendOtpClick
          }
          isDisabled={otp.isOtpSend && !Boolean(userData.otp)}
        />
        {otp.isOtpSend && (
          <Button
            className="send-verify-otp"
            text={t("resend")}
            onClick={handleOnResendOtpClick}
          />
        )}
      </div>
      {error && <div className="error-container">{t(error)}</div>}
    </div>
  );
};
