import React, { useState} from "react";
import "./userInfoSubCard.scss";

export const UserInfoSubCard: React.FC<UserInfoSubCardPropsInterface> = ({
  editing = false,
  userInputValue,
  value,
  text,
  field,
  onChange = () => {},
  errorMessage = "error",
  autoFocus=false,
}: UserInfoSubCardPropsInterface) => {
  const [isError, setIsError] = useState<boolean>(false);
  const validateNumberAndHandleError = (value: string = "", field: string) => {
    if (field === "phoneNumber") {
      if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
        setIsError(false);
      } else setIsError(true);
    } else setIsError(false);
  };
  return (
    <div className="field-value-wrapper">
      <label htmlFor={`user-data-${field}`} className="user-data-field">
        {text} :
      </label>
      {editing && userInputValue && field ? (
        <span className="user-data-input-error-wrapper">
          <input
            onChange={(e) => {
              validateNumberAndHandleError(e.target.value, field);
              onChange(e, field);
            }}
            type="text"
            id={`user-data-${field}`}
            value={userInputValue[field]}
            placeholder={`Add ${text.toLowerCase()}...`}
            className={`user-data-input-value ${
              isError && "user-data-input-value-error"
            }`}
            autoFocus={autoFocus}
          />
          <span
            className={`user-data-input-value-tool-tip ${
              isError && "user-data-input-value-tool-tip-show"
            }`}
          >
            {errorMessage}
          </span>
        </span>
      ) : value ? (
        <span className="user-data-value">{value}</span>
      ) : (
        <span className="user-data-value user-data-value-faded">{`Add ${text.toLowerCase()}...`}</span>
      )}
    </div>
  );
};