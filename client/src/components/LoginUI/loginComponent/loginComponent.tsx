import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { isValidEmail } from "../../../monorepoClient/helpers/utils/validations";
import { InputComponent } from "../../input/inputComponent";
import { Button } from "../../button/button";
import "./loginComponent.scss"
interface LoginComponentProps {
  handleLoginClick: (email: string, password: string) => void;
  handleOnForgetPasswordClick: () => void;
  handleOnLoginWithOtpClick:()=>void
}

export const LoginComponent: React.FC<LoginComponentProps> = ({
  handleLoginClick,
  handleOnForgetPasswordClick,
  handleOnLoginWithOtpClick
}) => {
  const { t } = useTranslation();
  const [currentUserData, setCurrentUserData] = useState({
    email: "",
    password: "",
  });
  const setUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUserData({ ...currentUserData, email: e.target.value });
  };
  const setUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUserData({ ...currentUserData, password: e.target.value });
  };
  const handleOnLoginButtonClick = () => {
    handleLoginClick(currentUserData.email, currentUserData.password);
  };
  return (
    <div className="login-component-wrapper">
      <div className="heading-wrapper">
        <h1 className="h1">{t("login")}</h1>
        <h3 className="h3">{t("Securely access your account.")}</h3>
      </div>
      <InputComponent
        onChange={setUserId}
        type="email"
        value={currentUserData.email}
        className="input-component"
        errorMessage="please enter valid email"
        placeholder="Enter user id"
      />
      <InputComponent
        onChange={setUserPassword}
        type="password"
        value={currentUserData.password}
        className="input-component"
        errorMessage="please enter valid Password"
        placeholder="Enter password"
      />
      <div className="forget-password-login-with-otp-wrapper">
        <span className="forget-password" onClick={handleOnForgetPasswordClick}>
          {t("Forget password")}
        </span>
      </div>
      <Button
        className="login-button"
        onClick={handleOnLoginButtonClick}
        text="login"
      />
    </div>
  );
};