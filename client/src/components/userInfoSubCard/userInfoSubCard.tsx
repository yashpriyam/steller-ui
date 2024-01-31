import React, { ChangeEvent, useEffect, useState} from "react";
import "./userInfoSubCard.scss";
import { isValidPhoneNumber } from "../../monorepoClient/helpers/utils/validations";

export const UserInfoSubCard: React.FC<UserInfoSubCardPropsInterface> = ({
  editing = false,
  userInputValue,
  value,
  text,
  field="",
  onChange = () => {},
  errorMessage,
  autoFocus=false,
  className,
}: UserInfoSubCardPropsInterface) => {
  const [isError, setIsError] = useState<boolean>(false);
  const onPhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (field === "phoneNumber") {
      if (isValidPhoneNumber(e.target.value)) {
        setIsError(false);
      } else setIsError(true);
    } else setIsError(false);
    onChange(e, field);
  };
  useEffect(()=>{
    !editing && setIsError(false);
  },[editing])
  return (
    <div className={`field-value-wrapper ${className}`}>
      <label htmlFor={`user-data-${field}`} className="user-data-field">
        {text} :
      </label>
      {editing && userInputValue && field ? (
        <span className="user-data-input-error-wrapper">
          <input
            onChange={onPhoneNumberChange}
            type="text"
            id={`user-data-${field}`}
            value={userInputValue[field]}
            placeholder={`Add ${text.toLowerCase()}...`}
            className={`user-data-input-value ${
              isError && "user-data-input-value-error"
            }`}
            autoFocus={autoFocus}
          />
          {errorMessage && <span
            className={`user-data-input-value-tool-tip ${
              isError && "user-data-input-value-tool-tip-show"
            }`}
          >
            {errorMessage}
          </span>}
        </span>
      ) : value ? (
        <span className="user-data-value">{value}</span>
      ) : (
        <span className="user-data-value user-data-value-faded">{`Add ${text.toLowerCase()}...`}</span>
      )}
    </div>
  );
};