import { CSSProperties, ChangeEvent, FC, useState } from "react";
import "./input.scss";
import { CloseLockIcon } from "../../icons/closeLockIcon";
import { OpenLockIcon } from "../../icons/openLockIcon";
import { isValidPassword } from "../../utils/isValidPassword";
import { isValidEmail } from "../../utils/isValidEmail";

export const InputComponent: FC<InputProps> = ({
  type,
  value,
  placeholder,
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showError, setShowError]= useState<boolean>(false)
  const constantValues: Record<string, string> = Object.freeze({
    password: "password",
    text: "text",
  });
  const containerStyle: CSSProperties = {
    height,
    width,
    backgroundColor,
    ...style,
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
    const typeValidationMap: Record<string, Function> = {
      email: (value: string) => {
        setShowError(!isValidEmail(value));
      },
      password: (value: string) => {
        setShowError(!isValidPassword(value))        
      },
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      const inputValue = e.target.value;
      typeValidationMap[type] && typeValidationMap[type](inputValue);
    };
  return (
    <div
      className={` input-component-wrapper  ${className} `}
      style={containerStyle}
    >
      <span
        className={`input-component-container ${
          showError && "input-component-error"
        }`}
      >
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
      {showError && (
        <div className="input-component-error-container">
          <span className="error">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
