import { Button } from "../button/button";
import { InputComponent } from "../input/inputComponent";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/login/loginSlice";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./createPassword.scss";
import { isValidPassword } from "../../utils/isValidPassword";

export const CreatePassword: React.FC<CreatePasswordProps> = ({
  handleSkip = () => {},
  handleOnCreateNewPassword = () => {},
}) => {
  const currentData: LoginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { setPassword } = loginAction;
  const [passwordData, setPasswordData] = useState({
    confirmPassword: "",
    passwordMatch: false,
  });
  const { t } = useTranslation();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setPassword(value));
    setPasswordData({
      ...passwordData,
      passwordMatch:
        value === passwordData.confirmPassword && isValidPassword(value),
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setPasswordData({
      ...passwordData,
      confirmPassword: value,
      passwordMatch: value === currentData.password,
    });
  };
  const handleCreatePasswordButton = () => {
    handleOnCreateNewPassword();
  };

  return (
    <div className="create-password-wrapper">
      <h1 className="create-password-heading">{t("create-password")}</h1>
      <div onClick={handleSkip} className="skip-container">
        {t("skip ")}
      </div>
      <InputComponent
        className="input-component"
        type="password"
        placeholder={t("New Password")}
        value={currentData.password}
        onChange={handlePasswordChange}
      />
      <InputComponent
        type="password"
        placeholder={t("Confirm Password")}
        value={passwordData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        disabled={!isValidPassword(currentData.password)}
        className={`input-component ${
          currentData.password !== "" && !passwordData.passwordMatch
            ? "not-matched"
            : ""
        }`}
      />
      <Button
        className="create-password-button"
        text={t("Create Password")}
        isDisabled={!passwordData.passwordMatch}
        onClick={handleCreatePasswordButton}
      />
      {!passwordData.passwordMatch && passwordData.confirmPassword && (
        <div className="error-container">
          {t("The passwords you entered do not match.")}
        </div>
      )}
      <div className="password-description">
        <h6 className="password-requirement-header">
          {t("Password Requirements:")}
        </h6>
        <p className="password-requirement">
          {t(
            "Use at least 8 characters, 1 uppercase, 1 lowercase, 1 digits, 1special character for your password."
          )}
        </p>
      </div>
    </div>
  );
};
