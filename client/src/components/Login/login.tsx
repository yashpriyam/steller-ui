import React, { useState } from "react";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { OtpVerification } from "../otpVerfication/otpVerfication";
import { CreatePassword } from "../createPassword/createPassword";
import { LoginComponent } from "../loginComponent/loginComponent";
import { useUser } from "../../redux/actions/userAction";
import { loginAction } from "../../redux/slices/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { CloseCrossIcon } from "../../icons/closeCrossIcon";
export const Login: React.FC<LoginProps> = ({
  className,
  style,
  bgColor,
  textColor,
  closeModal = () => {},
}: LoginProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { verifyUserOtpApi, sendOtpApi, updateUserPasswordApi, loginUserApi } =
    useUser();
  const dispatch = useDispatch();
  const currentData: LoginState = useSelector((state: any) => state.login);
  const { setPassword, setEmail, setIsSending,setIsOtpValid,setIsOtpSend } = loginAction;
  const presentScreen: Record<string, string> = {
    CREATE_PASSWORD: "CREATE_PASSWORD",
    OTP_VERIFICATION: "FORGET_PASSWORD",
    LOGIN: "LOGIN",
  };
  const handleLoginClick = async (): Promise<boolean> => {
    try {
        dispatch(setIsSending(true));
      const response = await loginUserApi({
        email: currentData.email,
        password: currentData.password,
      });
        dispatch(setIsSending(false));

      const status = response.data.login.response.status;
      if (status === 200) {
        dispatch(setPassword(""));
        dispatch(setEmail(""));
        dispatch(setIsOtpSend(false))
        dispatch(setIsOtpValid(false))
        closeModal();
        navigate("/dashboard");
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  const handleOnForgetPasswordClick = () => {
    setCurrentScreen(presentScreen.OTP_VERIFICATION);
  };
  const handleOnSendOtp = async (): Promise<boolean> => {
    const response = await sendOtpApi(currentData.email);
    return response.status === 200;
  };
  const handleOnVerifyOtp = async (otp: string): Promise<boolean> => {
    try {
      const response = await verifyUserOtpApi(currentData.email, otp);
      const isValidOtp = response.response.data.verifyUserOtp.status === 200;
      isValidOtp && setCurrentScreen(presentScreen.CREATE_PASSWORD);
      return isValidOtp;
    } catch (error) {
      return false;
    }
  };
  const onBackClick = () => {
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setIsOtpSend(false));
    dispatch(setIsOtpValid(false));
    dispatch(setIsSending(false));
    setCurrentScreen(presentScreen.LOGIN);
  };
  const handleOnCreateNewPassword = async () => {
    try {
      const response = await updateUserPasswordApi(
        currentData.email,
        currentData.password
      );
      const isDataUpdated = response?.response.data.updateUserPassword.status;
      if (isDataUpdated === 200) {
        Toast.success(t("password_created_success"));
        dispatch(setEmail(""))
        dispatch(setPassword(""));
        dispatch(setIsOtpSend(false));
        dispatch(setIsOtpValid(false));
        dispatch(setIsSending(false));
        closeModal();
        navigate("/dashboard");
      } else {
        Toast.error(t("password_creation_failed"))
      }
    } catch (error) {}
  };
  const handleOnCloseModal = () => {
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setIsOtpSend(false));
    dispatch(setIsOtpValid(false));
    dispatch(setIsSending(false));
    closeModal();
  }
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
      <CreatePassword handleOnCreateNewPassword={handleOnCreateNewPassword} />
    ),
  };
  const [currentScreen, setCurrentScreen] = useState(presentScreen.LOGIN);
  return (
    <div
      className={`login-wrapper-container ${className}`}
      style={{ ...style }}
    >
      <div className={`close-button ${className}`} onClick={handleOnCloseModal}>
        <CloseCrossIcon />
      </div>
      <div
        className="login-page"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {screen[currentScreen]}
      </div>
    </div>
  );
};
