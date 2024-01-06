import { Button } from "../button/button";
import { InputComponent } from "../input/inputComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./createPassword.scss";
import { isValidPassword } from "../../utils/isValidPassword";

export const CreatePassword: React.FC<CreatePasswordProps> = ({
  handleSkip = () => {},
  handleOnCreateNewPassword = (password: string) => {},
}) => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
    passwordMatch: false,
  });
  const { t } = useTranslation();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordData({
      ...passwordData,
      password: value,
      passwordMatch:
        e.target.value === passwordData.confirmPassword &&
        isValidPassword(value),
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setPasswordData({
      ...passwordData,
      confirmPassword: value,
      passwordMatch: value === passwordData.password,
    });
  };
  const handleCreatePasswordButton = () => {
    handleOnCreateNewPassword(passwordData.password);
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
        value={passwordData.password}
        onChange={handlePasswordChange}
      />
      <InputComponent
        type="password"
        placeholder={t("Confirm Password")}
        value={passwordData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        disabled={!isValidPassword(passwordData.password)}
        className={`input-component ${
          passwordData.password !== "" && !passwordData.passwordMatch
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

