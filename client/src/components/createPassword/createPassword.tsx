import { Button } from "../button/button";
import { InputComponent } from "../input/inputComponent";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/login/loginSlice";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./createPassword.scss";
import { isValidPassword } from "../../utils/isValidPassword";

export const CreatePassword: React.FC<CreatePasswordProps> = ({
  handleOnCreateNewPassword = () => {},
}) => {
  const currentData: LoginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { setPassword, setIsSending } = loginAction;
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
  const handleCreatePasswordButton = async () => {
    dispatch(setIsSending(true));
    await handleOnCreateNewPassword();
    dispatch(setIsSending(false));
  };

  return (
    <div className="create-password-wrapper">
      <h1 className="create-password-heading">{t("create_password")}</h1>
      <InputComponent
        className="input-component"
        type="password"
        placeholder={t("new-password")}
        value={currentData.password}
        onChange={handlePasswordChange}
      />
      <InputComponent
        type="password"
        placeholder={t("confirm_password")}
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
        text={t("create_password")}
        isDisabled={!passwordData.passwordMatch}
        onClick={handleCreatePasswordButton}
        isLoading={currentData.isOtpSending}
        iconPosition="center"
      />
      {
        <div
          className={`error-container ${
            !passwordData.passwordMatch &&
            passwordData.confirmPassword &&
            "show-error"
          }`}
        >
          {t("error_on_password_not_match")}
        </div>
      }
      <div className="password-description">
        <h6 className="password-requirement-header">
          {t("password_required_head")}
        </h6>
        <p className="password-requirement">
          {t("password_required_descriptioin")}
        </p>
      </div>
    </div>
  );
};
