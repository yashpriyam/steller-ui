import React, { useState } from "react";
import "./loginUI.scss";
import {LeftArrow} from "../index";

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
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }
    setError('');
  };

  const handleInputChange = () => {
    setError('');
  };

  const handleLoginWithOTP = () => {
    setEmail('')
    setPassword('')
    setOtp('')
    setCurrentScreen(Screen.Screen_2);
  };

  const handleVerifyOTP = () => {
    setEmail('');
    setOtp('');
    if (!otp.trim() || !email.trim()) {
      setError('Please enter Email and OTP.');
      return;
    }
    setError('');
    setCurrentScreen(Screen.Screen_3);
  };

  const handelSkip = () => {
    setEmail('')
    setPassword('')
    setCurrentScreen(Screen.Screen_1);
  };

  const handleBackArrow = ()=>{
    setEmail('')
    setCurrentScreen(Screen.Screen_1);
  }
  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Screen_1:
        return (
          <div className="screen1">
            <div className="text">
            <h1 className="h1">Login</h1>
            <h3 className="h3">Securely access your account.</h3>
            </div>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)
                handleInputChange()}}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)
              handleInputChange()}}
              required
            />
            <button className="link">Forget password ?</button>
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
            <div className="back-arrow" onClick={handleBackArrow}><LeftArrow/></div>
            <h1 className="h1">Verification</h1>
            <input
              className="input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)
                handleInputChange()}}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {setOtp(e.target.value)
                handleInputChange()}}
              required
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
              required
            />
            <button className="button">Confirm Password</button>
            <button onClick={handelSkip} className="link">Skip for now</button>
            <button className="button2">Create Password</button>
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
        {error && <div className="error-text">{error}</div>}
      </div>
    </div>
  );
};
