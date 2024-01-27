import React, { useState, useEffect } from "react";
import "./uploadImage.scss";
import { CameraIcon } from "../../icons/index";
export const UploadImage: React.FC<UploadImagePropsInterface> = ({
  className,
  disable,
  multiple = false,
  text = "Upload Image",
  style,
  onChange,
  url,
}: UploadImagePropsInterface) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const handleClick = () => {
    if (url) setShowPreview(true);
    else setShowPreview(false);
  };
  useEffect(() => {
    handleClick();
  }, [url]);
  return (
    <div
      className={`upload-image-container 
          ${className} 
          ${disable && "upload-image-disabled"}
        `}
      style={style}
    >
      <input
        type="file"
        multiple={multiple}
        id="file-type"
        style={{ display: "none" }}
        onChange={onChange}
        accept="image/*"
      />
      <label
        className={`upload-image-label ${
          showPreview && "upload-image-label-hide"
        }`}
        htmlFor="file-type"
      >
        <CameraIcon width="50px" height="50px" />
        <span className="label-text">{text}</span>
      </label>
      {url && (
        <img
          className="upload-image-preview-show"
          src={url}
          alt="upload-preview"
        />
      )}
    </div>
  );
};
