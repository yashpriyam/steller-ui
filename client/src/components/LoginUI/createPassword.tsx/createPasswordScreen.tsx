import { Button } from "../../../components/button/button";
import { InputComponent } from "../../../components/input/inputComponent";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import "./createPassword.scss"
import { isValidPassword } from "../../../utils/isValidPassword";

interface CreatePasswordProps {
  handelSkip?: () => void;
  handleOnCreateNewPassword?:(password:string)=>void;
}

export const CreatePassword: React.FC<CreatePasswordProps> = ({
  handelSkip = () => {},
  handleOnCreateNewPassword = (password: string) => {},
}) => {
  const [password, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
    passwordMatch: false,
  });
  console.log(
    password.password,
    password.confirmPassword,
    password.passwordMatch
  );

  const { t } = useTranslation();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...password,
      password: e.target.value,
      passwordMatch:
        e.target.value === password.confirmPassword &&
        isValidPassword(e.target.value),
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordData({
      ...password,
      confirmPassword: e.target.value,
      passwordMatch: e.target.value === password.password,
    });
  };
  const handleCreatePasswordButton = () => {
    handleOnCreateNewPassword(password.password);
  };

  return (
    <div className="create-password-wrapper">
      <h1 className="create-password-heading">{t("create-password")}</h1>
      <div onClick={handelSkip} className="skip-container">
        {"skip"}
      </div>
      <InputComponent
        className="input-component"
        type="password"
        placeholder="New Password"
        value={password.password}
        onChange={handlePasswordChange}
      />
      <InputComponent
        type="password"
        placeholder="Confirm Password"
        value={password.confirmPassword}
        onChange={handleConfirmPasswordChange}
        disabled={!isValidPassword(password.password)}
        className={`input-component ${
          password.password !== "" && !password.passwordMatch
            ? "not-matched"
            : ""
        }`}
      />
      <Button
        className="create-password-button"
        text="Create Password"
        isDisabled={!password.passwordMatch}
        onClick={handleCreatePasswordButton}
      />
      {!password.passwordMatch && password.confirmPassword && (
        <div className="error-container">
          The passwords you entered do not match.
        </div>
      )}
      <div className="password-description">
        <h6 className="password-requirement-header">Password Requirements:</h6>
        <p className="password-requirement">
          Use at least 8 characters, 1 uppercase, 1 lowercase, 1 digits, 1
          special character for your password.
        </p>
      </div>
    </div>
  );
};


{
  /* <input
  className="input"
  type="password"
  placeholder="New Password"
  value={password.password}
  onChange={handlePasswordChange}
  required
/>
<input
  className={`input ${!password.passwordMatch&&"passwordMatched"}`}
  type="password"
  placeholder="Confirm Password"
  // value={}
  onChange={handleConfirmPassword}
  required
/>
{/* <button className="button">{t("confirm-password")}</button> */
}
{
  /* <button onClick={handelSkip} className="link">
  {t("skip")}
</button>
<button className="button2">{t("create-password")}</button> */
}
// import React from 'react'
// export const CreatePasswordScreen = ({t,newPassword,setNewPassword,handelSkip}) => {
//   return (
//     <div className="screen3">
//             <h1 className="h1">{t("create-password")}</h1>
//             <input
//             className="input"
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <button className="button">{t("confirm-password")}</button>
//             <button onClick={handelSkip} className="link">{t("skip")}</button>
//             <button className="button2">{t("create-password")}</button>
//           </div>
//   )
// }
