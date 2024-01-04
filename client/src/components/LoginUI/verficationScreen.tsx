import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { LeftArrow } from "../index";
import { useTranslation } from "react-i18next";
import { isValidEmail } from "../../monorepoClient/helpers/utils/validations";

interface VerificationScreenProps {
  email: string;
  setUserData: Dispatch<SetStateAction<{ email: string; password: string }>>;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  handleBackArrow: () => void;
  handleInputChange: () => void;
  handleVerifyOTP: () => void;
}

export const VerficationScreen: React.FC<VerificationScreenProps> = ({
  email,
  setUserData,
  otp,
  setOtp,
  handleBackArrow,
  handleInputChange,
  handleVerifyOTP,
}) => {
  const { t } = useTranslation();
  const [isEmailValid,setIsValidEmail]=useState<boolean>(false)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(userData => { return { ...userData, email: e.target.value } });
    isValidEmail(e.target.value)
    handleInputChange();
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp( e.target.value );
    handleInputChange();
  };

  return (
    <div className="screen2">
      <div className="back-arrow" onClick={handleBackArrow}>
        <LeftArrow />
      </div>
      <h1 className="h1">{t("verification")}</h1>
      <input
        className="input"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleOtpChange}
        required
      />
      <button onClick={handleVerifyOTP} className="button">
        {t("verify-otp")}
      </button>
    </div>
  );
};

// import React from "react";
// import { LeftArrow } from "../index";

// export const VerficationScreen = ({t,email,setEmail,otp,setOtp,handleBackArrow,handleInputChange,handleVerifyOTP}) => {
//     return (
//     <div className="screen2">
//       <div className="back-arrow" onClick={handleBackArrow}>
//         <LeftArrow />
//       </div>
//       <h1 className="h1">{t("verification")}</h1>
//       <input
//         className="input"
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => {
//           setEmail(e.target.value);
//           handleInputChange();
//         }}
//         required
//       />
//       <input
//         className="input"
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => {
//           setOtp(e.target.value);
//           handleInputChange();
//         }}
//         required
//       />
//       <button onClick={handleVerifyOTP} className="button">
//         {t("verify-otp")}
//       </button>
//     </div>
//   );
// };
