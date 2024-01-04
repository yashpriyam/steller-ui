import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

interface CreatePasswordScreenProps {
  handelSkip: () => void;
  handleOnCreateNewPassword:(password:string)=>void;
}

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = ({
  handelSkip,
  handleOnCreateNewPassword,
}) => {
  const [password, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
    passwordMatch: false,
  });

  const { t } = useTranslation();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...password,
      password: e.target.value,
      passwordMatch: e.target.value === password.confirmPassword,
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
    handleOnCreateNewPassword(password.confirmPassword);
  };

  return (
    <div className="screen3">
      <h1 className="h1">{t("create-password")}</h1>
      <input
        className="input"
        type="password"
        placeholder="New Password"
        value={password.password}
        onChange={handlePasswordChange}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={password.confirmPassword}
        onChange={handleConfirmPasswordChange}
        className={`input ${
          password.password !== "" && !password.passwordMatch
            ? "not-matched"
            : ""
        }`}
      />
      <button onClick={handelSkip} className="link">
        {t("skip")}
      </button>
      <button
        className="button2"
        disabled={!password.passwordMatch}
        onClick={handleCreatePasswordButton}
      >
        Create Password
      </button>
    </div>
  );
};

export default CreatePasswordScreen;

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
