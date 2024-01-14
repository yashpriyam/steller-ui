import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/login/loginSlice";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/button";
import "./loginComponent.scss";
import Toast from "../../utils/toast";

export const LoginComponent: React.FC<LoginComponentProps> = ({
  handleLoginClick,
  handleOnForgetPasswordClick,
}) => {
  const { t } = useTranslation();
  const currentData: LoginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { setEmail, setPassword,setIsSending } = loginAction;
  const setEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    dispatch(setEmail(email));
  };
  const setPasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setPassword(password));
  };
  const handleOnLoginButtonClick = async () => {
    dispatch(setIsSending(true));
    const isLogin = await handleLoginClick();
    dispatch(setIsSending(false))
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    isLogin ?Toast.success(t("login_success")): Toast.error(t("error_on_login"));
  };
  return (
    <div className="login-component-wrapper">
      <div className="heading-wrapper">
        <h1>{t("login")}</h1>
        <h3>{t("access")}</h3>
      </div>
      <InputComponent
        onChange={setEmailOnChange}
        type="email"
        value={currentData.email}
        className="input-component"
        errorMessage={t("error_valid_mail")}
        placeholder={t("enter_email")}
      />
      <InputComponent
        onChange={setPasswordOnChange}
        type="password"
        value={currentData.password}
        className="input-component"
        errorMessage={t("enter_valid_password")}
        placeholder={t("enter_password")}
      />
      <div className="forget-password-login-with-otp-wrapper">
        <span className="forget-password" onClick={handleOnForgetPasswordClick}>
          {t("forget_password")}
        </span>
      </div>
      <Button
        className="login-button"
        onClick={handleOnLoginButtonClick}
        text={t("login")}
        isLoading={currentData.isOtpSending}
        iconPosition="center"
        isDisabled={!(currentData.email && currentData.password)}
      />
    </div>
  );
};