import "./userPage.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../../redux/actions/userAction";
import { UserInfoSubCard } from "../../components/userInfoSubCard/userInfoSubCard";
import { newFormTextValues } from "./userPageData";
interface UserPagePropsInterFace {
  className?: string;
}
export const UserPage: React.FC<UserPagePropsInterFace> = ({
  className,
}: UserPagePropsInterFace) => {
  const [editingUserData, setEditingUserData] =
    useState<SecondaryUserSchemaType>();
  const [isFormEditing, setIsFormEditing] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [formTextValues, setFormTextValues] =
    useState<SecondaryUserSchemaType>();
  const { user, updateUserInfo } = useUser();
  const { userData } = user || {};
  const {
    email,
    name,
    phoneNumber,
    batchCode,
    location,
    occupation,
    profileImage,
    course,
    courseYear,
    branch,
    collegeName,
  } = userData || {};
  const { secureUrl } = profileImage || {};

  const handleFunction = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setEditingUserData({ ...editingUserData, [field]: e.target.value });
  };
  const isFieldEditedable = (field: string): boolean => {
    const nonEditedableFields = ["email", "batchCode"];
    return !nonEditedableFields.includes(field);
  };
  const updateUserInfoRequest = async () => {
    await updateUserInfo({ ...editingUserData });
  };
  const setInitialDataInState = () => {
    userData &&
      setEditingUserData({
        batchCode,
        email,
        name,
        phoneNumber,
        location,
        collegeName,
        occupation,
        course,
        courseYear,
        branch,
      });
    setIsFormEditing(false);
  };
  const handleFormEditing = () => {
    setIsFormEditing(!isFormEditing);
    setEditingUserData({ ...editingUserData });
  };
  useEffect(() => {
    setInitialDataInState();
    setFormTextValues(newFormTextValues);
  }, [userData]);
  return (
    <div className={`user-account-main-container ${className}`}>
      <div className="user-account-header-container">
        <img src={secureUrl} alt="profile" className="user-profile-image" />
        <div className="user-account-header-container-right-side">
          <div className="user-account-holder-name">{name}</div>
          <div className="user-account-image-container-button-wrapper">
            {isFormEditing && (
              <button
                className="user-profile-edit-button"
                onClick={setInitialDataInState}
              >
                Cancel
              </button>
            )}
            <button
              className="user-profile-edit-button"
              onClick={
                !isFormEditing ? handleFormEditing : updateUserInfoRequest
              }
            >
              {!isFormEditing ? "Edit Profile" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="user-account-container">
        {editingUserData &&
          Object.entries(editingUserData)
            ?.slice(0, 4)
            .map(([key, value], idx) => {
              if (isFieldEditedable(key)) {
                return (
                  <UserInfoSubCard
                    text={formTextValues ? `${formTextValues[key]}` : key}
                    value={value}
                    editing={isFormEditing}
                    userInputValue={editingUserData}
                    field={key}
                    onChange={handleFunction}
                    key={idx}
                  />
                );
              } else {
                return (
                  <UserInfoSubCard
                    text={formTextValues ? `${formTextValues[key]}` : key}
                    value={value}
                    key={idx}
                  />
                );
              }
            })}
      </div>
      <div className="user-account-more-info-container">
        <div
          className="user-account-more-info-container-header"
          onClick={() => setShowMore(!showMore)}
        >
          <span>Complete Your Profile</span>
          <span
            className={`show-more-user-info-button ${
              showMore && "show-more-user-info-button-rotate"
            }`}
          >
            +
          </span>
        </div>
        <div
          className={`user-account-more-info-wrapper ${
            showMore && "user-account-more-info-wrapper-display"
          }`}
        >
          {editingUserData &&
            Object.entries(editingUserData)
              ?.slice(4)
              .map(([key, value], idx) => {
                if (isFieldEditedable(key)) {
                  return (
                    <UserInfoSubCard
                      text={formTextValues ? `${formTextValues[key]}` : key}
                      value={value}
                      editing={isFormEditing}
                      userInputValue={editingUserData}
                      field={key}
                      onChange={handleFunction}
                      autoFocus={idx === 0}
                      key={idx}
                    />
                  );
                } else {
                  return (
                    <UserInfoSubCard
                      text={formTextValues ? `${formTextValues[key]}` : key}
                      value={value}
                      key={idx}
                    />
                  );
                }
              })}
        </div>
      </div>
    </div>
  );
};