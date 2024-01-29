import { useState } from "react";
import { useUser } from "../../redux/actions/userAction";
import "./userPage.scss";
interface UserPagePropsInterFace {
  className?: string;
}
export const UserPage: React.FC<UserPagePropsInterFace> = ({
  className,
}: UserPagePropsInterFace) => {
  const { user } = useUser();
  const { userData } = user || {};
  const { email, name,phoneNumber,batchCode,location,occupation,profileImage } = userData || {};
  const { secureUrl } = profileImage || {};
  // const userDataArr = Object.entries(userData || {});
  // console.log({userDataArr})
  const [ isEditForm, setIsEditForm] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>(email|| "");
  return (
    <div className="user-account-main-container">
      <div className="user-account-image-container">
        <img src={secureUrl} alt="profile" className="user-profile-image" />
        <button
          className="user-profile-edit-button"
          onClick={() => {
            setIsEditForm(!isEditForm);
            setUserEmail(email)
          }}
        >
          {!isEditForm ? "Edit Profile" : "Save"}
        </button>
      </div>
      <div className="user-account-container">
        <div className="field-value-wrapper">
          <label htmlFor="user-data-email" className="user-data-field">
            Email :{" "}
          </label>
          {isEditForm ? (
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              type="text"
              id="user-data-email"
              value={userEmail}
              className="user-data-input-value"
            />
          ) : (
            <span className="user-data-value">{email}</span>
          )}
        </div>
        <div className="field-value-wrapper">
          <span className="user-data-field">Name : </span>
          <span className="user-data-value">{name}</span>
        </div>
        <div className="field-value-wrapper">
          <span className="user-data-field">Phone : </span>
          <span className="user-data-value">{phoneNumber}</span>
        </div>
        <div className="field-value-wrapper">
          <span className="user-data-field">Batch Code : </span>
          <span className="user-data-value">{batchCode}</span>
        </div>
        <div className="field-value-wrapper">
          <span className="user-data-field">Location : </span>
          <span className="user-data-value">{location || "____"}</span>
        </div>
        <div className="field-value-wrapper">
          <span className="user-data-field">Occupation : </span>
          <span className="user-data-value">{occupation || "____"}</span>
        </div>
      </div>
      <div className="user-account-more-info-container">
        <span>+</span>
      </div>
    </div>
  );
};