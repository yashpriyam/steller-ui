import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftArrow from "../../icons/LeftArrow";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/button";
import { isValidEmail } from "../../utils/isValidEmail";
import "./otpVerification.scss";
import toast from "../../utils/toast"
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
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(60);

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };
  const handleOtpInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };
  const handleOnSendOtpClick = async () => {
    dispatch(setIsSending(true));
    const otpSend = await handleOnSendOtp();
    dispatch(setIsSending(false));
    if (otpSend) {
      toast.success("Otp sent successfully")
      setTimer(60);
      dispatch(setIsOtpSend(otpSend));
    } else {
      toast.error(t("invalid_email"));
    }
  };
  const handleOnVerifyOtpClick = async () => {
    dispatch(setIsSending(true));
    const isOtpValid = await verifyOtp(otp);
    dispatch(setIsSending(false));
    isOtpValid ? toast.success("Otp verified successfully") : toast.error(t("invalid_otp"));
    dispatch(setIsOtpValid(isOtpValid));
    setOtp("");
  };
  const handleOnResendOtpClick = async () => {
    if (disable) return;
    const otpSend = await handleOnSendOtp();
    if (otpSend) {
      toast.success("Otp sent successfully");
      dispatch(setIsOtpSend(true))
      setDisable(true);
      setTimer(60);
    } else {
      toast.error(t("invalid_email"));
    }
    setOtp("");
  };
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);
  return (
    <div className="verification-page-wrapper">
      <div className="back-arrow" onClick={onBackClick}>
        <LeftArrow />
      </div>
      <h1 className="heading-container">{t("verification")}</h1>
      <InputComponent
        type="email"
        className="input-component"
        value={currentData.email}
        placeholder={t("enter_email")}
        onChange={handleEmailInputChange}
        errorMessage={t("invalid_email")}
      />
      <InputComponent
        className="input-component"
        type="number"
        value={otp}
        placeholder={t("enter_otp")}
        onChange={handleOtpInputChange}
        disabled={!currentData.isOtpSend}
      />
      <div className="button-container">
        <Button
          text={currentData.isOtpSend ? t("verify_otp") : t("send_otp")}
          className="send-verify-otp"
          isLoading={currentData.isOtpSending}
          iconPosition="center"
          onClick={
            currentData.isOtpSend
              ? handleOnVerifyOtpClick
              : handleOnSendOtpClick
          }
        />
        <div
          className={`resend-otp ${
            currentData.isOtpSend && "resend-otp-start"
          }`}
          onClick={() => handleOnResendOtpClick()}
        >
          Didn't receive code?
          {disable ? ` Resend OTP in  ${timerCount}s ` : " Resend OTP"}
        </div>
      </div>
    </div>
  );
};