import React from "react";
import { LeftArrow } from "../index";

export const VerficationScreen = ({t,email,setEmail,otp,setOtp,handleBackArrow,handleInputChange,handleVerifyOTP}) => {
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
        onChange={(e) => {
          setEmail(e.target.value);
          handleInputChange();
        }}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value);
          handleInputChange();
        }}
        required
      />
      <button onClick={handleVerifyOTP} className="button">
        {t("verify-otp")}
      </button>
    </div>
  );
};
