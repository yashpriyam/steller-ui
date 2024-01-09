import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/login/loginSlice";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/button";
import "./loginComponent.scss";

export const LoginComponent: React.FC<LoginComponentProps> = ({
  handleLoginClick,
  handleOnForgetPasswordClick,
}) => {
  const { t } = useTranslation();
  const currentData: LoginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { setEmail, setPassword } = loginAction;
  const [error, setError] = useState<string>("");

  const setEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setError("");
    dispatch(setEmail(email));
  };
  const setPasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setError("");
    dispatch(setPassword(password));
  };
  const handleOnLoginButtonClick = async () => {
    const isLogin = await handleLoginClick();
    dispatch(setEmail(""), setPassword(""));
    isLogin ? setError("") : setError(t("Invalid Email and Password!"));
  };
  return (
    <div className="login-component-wrapper">
      <div className="heading-wrapper">
        <h1>{t("login")}</h1>
        <h3>{t("Securely access your account.")}</h3>
      </div>
      <InputComponent
        onChange={setEmailOnChange}
        type="email"
        value={currentData.email}
        className="input-component"
        errorMessage={t("please enter valid email")}
        placeholder={t("Enter user id")}
      />
      <InputComponent
        onChange={setPasswordOnChange}
        type="password"
        value={currentData.password}
        className="input-component"
        errorMessage={t("please enter valid Password")}
        placeholder={t("Enter password")}
      />
      <div className="forget-password-login-with-otp-wrapper">
        <span className="forget-password" onClick={handleOnForgetPasswordClick}>
          {t("Forget password")}
        </span>
      </div>
      <Button
        className="login-button"
        onClick={handleOnLoginButtonClick}
        text={t("login")}
        isDisabled={!(currentData.email && currentData.password)}
      />
      {<div className="error-container">{t(error)}</div>}
    </div>
  );
};
