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
  iconFillColor,
}: UploadImagePropsInterface) => {
  return (
    <div
      className={`upload-image-container  ${className}  ${disable && "upload-image-disabled"}`}
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
      <label className="upload-image-label" htmlFor="file-type-img">
        {Boolean(url) ? (
          <img
            className="upload-image-preview-show"
            src={url}
            alt="upload-preview"
          />
        ) : (
          <span className="upload-image-text-and-icon">
            <CameraIcon width="50px" height="50px" fillColor={iconFillColor} />
            <span className="label-text">{text}</span>
          </span>
        )}
      </label>
    </div>
  );
};
