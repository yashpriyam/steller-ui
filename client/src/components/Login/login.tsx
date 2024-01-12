import React, { useState } from "react";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { OtpVerification } from "../otpVerfication/otpVerfication";
import { CreatePassword } from "../createPassword/createPassword";
import { LoginComponent } from "../loginComponent/loginComponent";
import { useLogin } from "../../redux/actions/loginAction";
import { loginAction } from "../../redux/slices/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
export const Login: React.FC<LoginProps> = ({
  className,
  style,
  bgColor,
  textColor,
  closeModal=()=>{},
}: LoginProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    loginUser,
    sendOtpPaidUserApi,
    verifyOtpPaidUserApi,
    updatePaidUserPasswordApi,
  } = useLogin();
  const dispatch = useDispatch();
  const currentData: LoginState = useSelector((state: any) => state.login);
  const { setPassword, setEmail } = loginAction;
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
      const status = response.data.login.response.status;
      if (status === 200) {
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
    dispatch(setPassword(""));
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
    dispatch(setEmail(""));
    setCurrentScreen(presentScreen.LOGIN);
  };
  const handleOnCreateNewPassword = async () => {
    try {
      const response = await updatePaidUserPasswordApi(
        currentData.email,
        currentData.password
      );
      const isDataUpdated =
        response?.response.data.updatePaidUserPassword.status;
      if (isDataUpdated === 200) {
        Toast.success(t("password_created_success"))
        dispatch(setPassword(""));
        dispatch(setEmail(""));
        closeModal();
        navigate("/dashboard");
      }
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
      <CreatePassword handleOnCreateNewPassword={handleOnCreateNewPassword} />
    ),
  };
  const [currentScreen, setCurrentScreen] = useState(presentScreen.LOGIN);
  return (
    <div
      className={`login-wrapper-container ${className}`}
      style={{ ...style }}
    >
      <button className={`close-button ${className}`} onClick={closeModal}>
        ❌
      </button>
      <div
        className="login-page"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {screen[currentScreen]}
      </div>
    </div>
  );
};
