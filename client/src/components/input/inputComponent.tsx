import { ChangeEvent, FC, useState } from "react";
import "./input.scss";
import { isValidEmail } from "../../monorepoClient/helpers/utils/validations";
interface InputProps {
  type: "text" | "number" | "email" | "password";
  value: string | number;
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputComponent: FC<InputProps> = ({
  type,
  value,
  placeholder,
  error,
  disabled = false,
  onChange,
  className,
}: InputProps) => {
  const [inputType, setInputType] = useState(type);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOnClickOfEye = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };
  const handleOnFocusOut = () => {
    if (type === "email") {
      const isEmailValid = isValidEmail(value);
      setErrorMessage(!isEmailValid?value?"Please enter valid email":"":"")
    }
    else if (type === "password") {
      const errMessage=(value+"").length!==8&&value
      setErrorMessage(errMessage?"Password should be 8 digits":"")
    }
  };
  return (
    <div className="input-wrapper">
      <span className={`input-container ${className}`}>
        <input
          type={inputType}
          className={`input`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          onKeyUp={handleOnFocusOut}
        />
        {type === "password" && (
          <span className="is-password-visible" onClick={handleOnClickOfEye}>
            {inputType === "text" ? "hide" : "show"}
          </span>
        )}
      </span>
      {errorMessage&&
        <div className="error-container">
          <span className="error">{errorMessage}</span>
        </div>
      }
    </div>
  );
};
