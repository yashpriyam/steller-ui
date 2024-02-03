import "./userPage.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../../redux/actions/userAction";
import { Button } from "../../components/button/button";
import { useTranslation } from "react-i18next";
import { UploadImage } from "../../components/uploadImage/uploadImage";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { UserInfoCard } from "../../components/userInfoCard/userInfoCard";

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
  const [formTextValues, setFormTextValues] =
    useState<SecondaryUserSchemaType>();
  const [userPictureUrl, setUserPictureUrl] = useState<string>("");
  const [apiLoading, setApiLoading] = useState<{uploadImage:boolean, updateUserInfo: boolean}>({uploadImage:false, updateUserInfo: false});
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
    setApiLoading({...apiLoading, updateUserInfo: true});
    await updateUserInfo({
      ...mainDetailsOfUserData,
      ...otherDetailsOfUserData,
    });
    setApiLoading({...apiLoading, updateUserInfo: false});
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
    handleOnClickDeleteImage();
  };
  const handleFormEditing = () => {
    setIsFormEditing(!isFormEditing);
    setMainDetailsOfUserData({ ...mainDetailsOfUserData });
    setOtherDetailsOfUserData({ ...otherDetailsOfUserData });
    secureUrl && setUserPictureUrl(secureUrl);
  };
  const handleOnImageClick = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && Boolean(files.length)) {
      try {
        const response = await readFileAsDataURL(files[0]);
        setUserPictureUrl(typeof response === "string" ? response : "");
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleImageUpdation = async () => {
    setApiLoading({...apiLoading, uploadImage: true});
    await updateProfilePicture(userPictureUrl, 1, "name");
    setApiLoading({...apiLoading, uploadImage: false});
  };
  const handleOnClickDeleteImage = () => {
    secureUrl ? setUserPictureUrl(secureUrl) : setUserPictureUrl("");
    const fileInput = document.getElementById(
      "file-type-img"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
   (!mainDetailsOfUserData || !otherDetailsOfUserData) && setInitialDataInState();
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
        </div>

        <div className="user-account-header-container-right-side">
          <div className="user-account-holder-name">{name}</div>
          <div className="user-account-image-container-button-wrapper">
            {isFormEditing && (
              <Button
                text={t("upload_image")}
                className="user-profile-edit-button"
                onClick={handleImageUpdation}
                isLoading={apiLoading.uploadImage}
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
              isLoading={apiLoading.updateUserInfo}
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
        {mainDetailsOfUserData && (
          <UserInfoCard
            datalist={mainDetailsOfUserData}
            nonEditedableFields={nonEditedableFields}
            formTextValues={formTextValues}
            editing={isFormEditing}
            onChange={handleMainDetailsOfUserData}
          />
        )}
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
          {otherDetailsOfUserData && (
            <UserInfoCard
              datalist={otherDetailsOfUserData}
              nonEditedableFields={nonEditedableFields}
              formTextValues={formTextValues}
              editing={isFormEditing}
              onChange={handleOtherDetailsOfUserData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserPage;