import React, { useState } from "react";
import "./loginUI.scss";

enum Screen {
  Screen_1,
  Screen_2,
  Screen_3,
}

export interface LoginUIProps {
    className?: string;
    style?: React.CSSProperties;
    bgColor?: string;
    textColor?: string;
}

export const LoginUI: React.FC<LoginUIProps> = ({
    className,
    style,
    bgColor,
    textColor
}: LoginUIProps) => {
  const [currentScreen, setCurrentScreen] = useState(Screen.Screen_1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLoginClick = () => {
    if (currentScreen === Screen.Screen_1) {
      setCurrentScreen(Screen.Screen_2);
    }
  };

  const handleLoginWithOTP = () => {
    setCurrentScreen(Screen.Screen_2);
  };

  const handleVerifyOTP = () => {
    setCurrentScreen(Screen.Screen_3);
  };

  const handelSkip = () => {
    setCurrentScreen(Screen.Screen_1);
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Screen_1:
        return (
          <div className="screen1">
            <h1 className="h1">Login</h1>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLoginClick} className="button">
              Login
            </button>
            <hr className="hr" />
            <button onClick={handleLoginWithOTP} className="link">
              Login with OTP
            </button>
          </div>
        );
      case Screen.Screen_2:
        return (
          <div className="screen2">
            <h1 className="h1">Verification</h1>
            <input
              className="input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOTP} className="button">
              Verify OTP
            </button>
          </div>
        );
      case Screen.Screen_3:
        return (
          <div className="screen3">
            <h1 className="h1">Create Password</h1>
            <input
            className="input"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="button">Create</button>
            <hr className="hr"/>
            <button onClick={handelSkip} className="link">Skip</button>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className={`main ${className}`} style={{...style}}>
      <div className="login-page" style={{backgroundColor: bgColor, color: textColor}}>
        {renderScreen()}
      </div>
    </div>
  );
};
