import React, { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftArrow from "../../icons/LeftArrow";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/button";
import { isValidEmail } from "../../utils/isValidEmail";
import "./otpVerification.scss";
import { loginAction } from "../../redux/slices/login/loginSlice";

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  handleOnSendOtp,
  verifyOtp,
  onBackClick,
}) => {
  const currentData: LoginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { setEmail, setIsOtpValid, setIsOtpSend, setIsSending } = loginAction;
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    dispatch(setEmail(e.target.value));
  };
  const handleOtpInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setOtp(e.target.value);
  };
  const handleOnSendOtpClick = async () => {
    dispatch(setIsSending(true));
    const otpSend = await handleOnSendOtp();
    dispatch(setIsSending(false));
    otpSend ? setError("") : setError(t("Invalid email, enter valid email"));
    dispatch(setIsOtpSend(otpSend));
  };
  const handleOnVerifyOtpClick = async () => {
    const isOtpValid = await verifyOtp(otp);
    setError(
      isOtpValid ? "" : t("The entered OTP is invalid. Please try again.")
    );
    dispatch(setIsOtpValid(isOtpValid));
    setOtp("");
  };
  const handleOnResendOtpClick = async () => {
    const validEmail = isValidEmail(currentData.email);
    validEmail && handleOnSendOtp();
    setOtp("");
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
        value={currentData.email}
        placeholder={t("Enter email address")}
        onChange={handleEmailInputChange}
        errorMessage={t("Invalid email, enter valid email")}
      />
      <InputComponent
        className="input-component"
        type="number"
        value={otp}
        placeholder={t("Enter otp")}
        onChange={handleOtpInputChange}
        disabled={!currentData.isOtpSend}
      />
      <div className="button-container">
        <Button
          text={currentData.isOtpSend ? t("verify otp") : t("send otp")}
          className="send-verify-otp"
          isLoading={currentData.isOtpSending}
          iconPosition="center"
          onClick={
            currentData.isOtpSend
              ? handleOnVerifyOtpClick
              : handleOnSendOtpClick
          }
          isDisabled={
            currentData.isOtpSending || (currentData.isOtpSend && !Boolean(otp))
          }
        />
        {currentData.isOtpSend && (
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
