import React from "react";
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
        id="file-type-img"
        style={{ display: "none" }}
        onChange={onChange}
        accept="image/*"
      />
      <label
        className={`upload-image-label ${
          Boolean(url) && "upload-image-label-hide"
        }`}
        htmlFor="file-type-img"
      >
        <CameraIcon width="50px" height="50px" />
        <span className="label-text">{text}</span>
      </label>
      {Boolean(url) && (
        <img
          className="upload-image-preview-show"
          src={url}
          alt="upload-preview"
        />
      )}
    </div>
  );
};
