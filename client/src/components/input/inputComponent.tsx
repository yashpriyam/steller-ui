import { ChangeEvent, FC, useState } from "react";
import "./input.scss";
import { validateEmail } from "../../utils/validateEmail";
import { LockIcon } from "../../icons/lockIcon";
import { OpenLockIcon } from "../../icons/openLockIcon";

export const InputComponent: FC<InputProps> = ({
  type,
  value,
  placeholder,
  error,
  disabled = false,
  onChange,
  onHover,
  className,
}:InputProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const typeValidationMap: Record<string, Function> = {
    email: (value: string) => {
      setErrorMessage(
        !validateEmail(value) && Boolean(value)
          ? "Please enter a valid email"
          : ""
      );
    },
    password: (value: string) => {
      setErrorMessage(
        value.length === 8 || value.length === 0
          ? ""
          : "Password should be 8 digits"
      );
    },
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const inputValue = e.target.value;
    typeValidationMap[type] && typeValidationMap[type](inputValue);
  };
  return (
    <div
      className={` input-component-wrapper ${
        error && "input-component-error"
      } ${className} `}
    >
      <span className={`input-component-container`}>
        <input
          type={showPassword ? "text" : type}
          className={`input`}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          onMouseEnter={onHover}
          disabled={disabled}
        />
        {type === "password" && (
          <span className="password-visible" onClick={handleShowPassword}>
            {showPassword ? <OpenLockIcon /> : <LockIcon />}
          </span>
        )}
      </span>
      {errorMessage && (
        <div className="input-component-error-container">
          <span className="error">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
