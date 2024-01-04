import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { isValidEmail } from "../../monorepoClient/helpers/utils/validations";

interface LoginScreenProps {
  userData: { email: string; password: string };
  setUserData: Dispatch<SetStateAction<{ email: string; password: string }>>;
  handleInputChange: () => void;
  handleLoginClick: () => void;
  handleLoginWithOTP: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  setUserData,
  userData,
  handleInputChange,
  handleLoginClick,                                                                       
  handleLoginWithOTP,
}) => {
  const { t } = useTranslation();
  const [validPassword,setValidPassword]=useState<boolean>(false)
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
    setValidPassword(isValidEmail(e.target.value))
    handleInputChange();
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
    handleInputChange();
  };

  return (
    <div className="screen1">
      <div className="text">
        <h1 className="h1">{t("login")}</h1>
        <h3 className="h3">{t("access")}</h3>
      </div>
      <input
        className={`input 
          ${validPassword && "not-matched"}`}
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={userData?.password}
        onChange={handlePasswordChange}
        required
      />
      <button className="link">{t("forget-password")}</button>
      <button onClick={handleLoginClick} className="button">
        {t("login")}
      </button>
      <hr className="hr" />
      <button onClick={handleLoginWithOTP} className="link">
        {t("login-with-otp")}
      </button>
    </div>
  );
};

// export const LoginScreen = ({t,email,setEmail,password,setPassword,handleInputChange,handleLoginClick,handleLoginWithOTP}) => {
//     return (
//     <div className="screen1">
//             <div className="text">
//             <h1 className="h1">{t("login")}</h1>
//             <h3 className="h3">{t("access")}</h3>
//             </div>
//             <input
//               className="input"
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => {setEmail(e.target.value)
//                 handleInputChange()}}
//               required
//             />
//             <input
//               className="input"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => {setPassword(e.target.value)
//               handleInputChange()}}
//               required
//             />
//             <button className="link">{t("forget-password")}</button>
//             <button onClick={handleLoginClick} className="button">
//               {t("login")}
//             </button>
//             <hr className="hr" />
//             <button onClick={handleLoginWithOTP} className="link">
//               {t("login-with-otp")}
//             </button>
//           </div>
//   )
// }
