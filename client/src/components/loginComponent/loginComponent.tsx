import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/button";
import "./loginComponent.scss";

export const LoginComponent: React.FC<LoginComponentProps> = ({
  handleLoginClick,
  handleOnForgetPasswordClick,
}) => {
  const { t } = useTranslation();
  const [currentUserData, setCurrentUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setError("")
    setCurrentUserData({ ...currentUserData, email });
  };
  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setError("");
    setCurrentUserData({ ...currentUserData, password });
  };
  const handleOnLoginButtonClick = () => {
    const isLogin = handleLoginClick(
      currentUserData.email,
      currentUserData.password
    );    
    !isLogin ? setError(t("Invalid Email and Password!")) : setError("");
  };
  return (
    <div className="login-component-wrapper">
      <div className="heading-wrapper">
        <h1>{t("login")}</h1>
        <h3>{t("Securely access your account.")}</h3>
      </div>
      <InputComponent
        onChange={setEmail}
        type="email"
        value={currentUserData.email}
        className="input-component"
        errorMessage={t("please enter valid email")}
        placeholder={t("Enter user id")}
      />
      <InputComponent
        onChange={setPassword}
        type="password"
        value={currentUserData.password}
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
        isDisabled={!(currentUserData.email && currentUserData.password)}
      />
      {<div className="error-container">{t(error)}</div>}
    </div>
  );
};
