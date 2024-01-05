import { CSSProperties, ChangeEvent, FC, useState } from "react";
import "./input.scss";
import { CloseLockIcon } from "../../icons/closeLockIcon";
import { OpenLockIcon } from "../../icons/openLockIcon";

export const InputComponent: FC<InputProps> = ({
  type,
  value,
  placeholder,
  error,
  errorMessage = "please enter valid input",
  disabled = false,
  onChange,
  onHover,
  className,
  height,
  width,
  backgroundColor,
  style,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const constantValues: Record<string, string> = Object.freeze({
    password: "password",
    text: "text",
  });
  const divStyle: CSSProperties = {
    height,
    width,
    backgroundColor,
    ...style,
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <div
      className={` input-component-wrapper ${
        error && "input-component-error"
      } ${className} `}
      style={divStyle}
    >
      <span className={`input-component-container`}>
        <input
           type={showPassword ? constantValues.text : type}
          className={`input`}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          onMouseEnter={onHover}
          disabled={disabled}
        />
        {constantValues[type] && (
          <span className="password-visible" onClick={handleShowPassword}>
            {showPassword ? <OpenLockIcon /> : <CloseLockIcon />}
          </span>
        )}
      </span>
      {error && (
        <div className="input-component-error-container">
          <span className="error">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
