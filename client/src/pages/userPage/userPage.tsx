import "./userPage.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../../redux/actions/userAction";
import { UserInfoSubCard } from "../../components/userInfoSubCard/userInfoSubCard";
import { Button } from "../../components/button/button";
import { useTranslation } from "react-i18next";
import { UploadImage } from "../../components/uploadImage/uploadImage";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { PenIcon } from "../../icons/index";

const UserPage: React.FC<UserPagePropsInterFace> = ({
  className,
}: UserPagePropsInterFace) => {
  const { t } = useTranslation();
  const [mainDetailsOfUserData, setMainDetailsOfUserData] =
    useState<SecondaryUserSchemaType>();
  const [otherDetailsOfUserData, setOtherDetailsOfUserData] =
    useState<SecondaryUserSchemaType>();
  const [isFormEditing, setIsFormEditing] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showProfileImageOption, setShowProfileImageOption] =
    useState<boolean>(false);
  const [formTextValues, setFormTextValues] =
    useState<SecondaryUserSchemaType>();
  const [userPictureUrl, setUserPictureUrl] = useState<string>("");

  const { user, updateUserInfo, updateProfilePicture } = useUser();
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

  const handleMainDetailsOfUserData = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setMainDetailsOfUserData({
      ...mainDetailsOfUserData,
      [field]: e.target.value,
    });
  };
  const handleOtherDetailsOfUserData = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setOtherDetailsOfUserData({
      ...otherDetailsOfUserData,
      [field]: e.target.value,
    });
  };
  const newFormTextValues: SecondaryUserSchemaType = {
    name: "Name",
    email: "Email",
    phoneNumber: "Phone",
    batchCode: "Batch Code",
    location: "Location",
    occupation: "Occupation",
    collegeName: "College",
    course: "Course",
    courseYear: "Course Year",
    branch: "Branch",
  };
  const nonEditedableFields: nonEditableUserSchemaFieldsType = {
    email: true,
    batchCode: true,
  };
  const updateUserInfoRequest = async () => {
    await updateUserInfo({
      ...mainDetailsOfUserData,
      ...otherDetailsOfUserData,
    });
  };
  const setInitialDataInState = () => {
    if (Boolean(userData)) {
      setMainDetailsOfUserData({
        batchCode,
        email,
        name,
        phoneNumber,
      });
      setOtherDetailsOfUserData({
        branch,
        collegeName,
        course,
        courseYear,
        location,
        occupation,
      });
    }
    setIsFormEditing(false);
    setShowProfileImageOption(false);
    handleOnClickDeleteImage();
  };
  const handleFormEditing = () => {
    setIsFormEditing(!isFormEditing);
    setMainDetailsOfUserData({ ...mainDetailsOfUserData });
    setOtherDetailsOfUserData({ ...otherDetailsOfUserData });
    secureUrl && setUserPictureUrl(secureUrl);
    setShowProfileImageOption(true);
  };
  const handleOnImageClick = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && Boolean(files.length)) {
      try {
        const response = await readFileAsDataURL(files[0]);
        setUserPictureUrl(typeof response === "string" ? response : "");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleImageUpdation = async () => {
    const res = await updateProfilePicture(userPictureUrl, 1, "name");
  };
  const handleOnClickDeleteImage = () => {
    setUserPictureUrl("");
    const fileInput = document.getElementById(
      "file-type-img"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    setInitialDataInState();
    setFormTextValues(newFormTextValues);
  }, [userData]);
  return (
    <div className={`user-account-main-container ${className}`}>
      <div className="user-account-header-container">
        <div className="profile-image-wrapper">
          {secureUrl && !isFormEditing && (
            <img src={secureUrl} alt="profile" className="user-profile-image" />
          )}
          {isFormEditing && (
            <UploadImage
              url={userPictureUrl}
              className="user-profile-update-image-container"
              iconFillColor="#3498db"
              onChange={handleOnImageClick}
            />
          )}
        {/* {showProfileImageOption && (
          <span className="profile-image-option-tool">
            <PenIcon />
          </span>
        )} */}
        </div>

        <div className="user-account-header-container-right-side">
          <div className="user-account-holder-name">{name}</div>
          <div className="user-account-image-container-button-wrapper">
            {isFormEditing && (
              <Button
                text={t("upload_image")}
                className="user-profile-edit-button"
                onClick={handleImageUpdation}
              />
            )}
            <Button
              className={`user-profile-edit-button ${
                isFormEditing && "user-profile-save-button"
              }`}
              onClick={
                isFormEditing ? updateUserInfoRequest : handleFormEditing
              }
              text={isFormEditing ? t("save") : t("edit_profile")}
            />
            {isFormEditing && (
              <Button
                text={t("cancel")}
                className="user-profile-edit-button user-profile-cancel-button"
                onClick={setInitialDataInState}
              />
            )}
          </div>
        </div>
      </div>
      <div className="user-account-container">
        {mainDetailsOfUserData &&
          Object.entries(mainDetailsOfUserData)?.map(([key, value], idx) => {
            if (!nonEditedableFields[key]) {
              return (
                <UserInfoSubCard
                  text={formTextValues ? `${formTextValues[key]}` : key}
                  value={value}
                  editing={isFormEditing}
                  userInputValue={mainDetailsOfUserData}
                  field={key}
                  onChange={handleMainDetailsOfUserData}
                  key={idx}
                  errorMessage={
                    key === "phoneNumber"
                      ? "phone number must contain 10 digits only"
                      : "error"
                  }
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
          <span>{t("complete_profile")}</span>
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
          {otherDetailsOfUserData &&
            Object.entries(otherDetailsOfUserData)?.map(([key, value], idx) => {
              if (!nonEditedableFields[key]) {
                return (
                  <UserInfoSubCard
                    text={formTextValues ? `${formTextValues[key]}` : key}
                    value={value}
                    editing={isFormEditing}
                    userInputValue={otherDetailsOfUserData}
                    field={key}
                    onChange={handleOtherDetailsOfUserData}
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
export default UserPage;