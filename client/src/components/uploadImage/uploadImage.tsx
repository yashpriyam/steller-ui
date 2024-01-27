import React, { CSSProperties, ReactNode, FC, ChangeEventHandler, useState, useEffect } from "react";
import "./uploadImage.scss";
import { CameraIcon } from "../../icons/index";
interface UploadImageProps {
  className?: string;
  disable?: boolean;
  multiple?: boolean;
  text?: string | ReactNode;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  url?: string;
}
export const UploadImage: FC<UploadImageProps> = ({
  className,
  disable,
  multiple = false,
  text = "Upload Image",
  style,
  onChange,
  url,
}: UploadImageProps) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const handleClick = ()=>{
    if(url) setShowPreview(true);
    else setShowPreview(false);
  }
  useEffect(()=>{
    handleClick();
  },[url])
  return (
    <div className="upload-image-main-container">
      <div
        className={`upload-image-container 
          ${className} 
          ${ disable && "upload-image-disabled" }
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
        <label className={`upload-image-label ${showPreview && "upload-image-label-hide"}`} htmlFor="file-type">
          <CameraIcon width="50px" height="50px"/>
          <span>{text}</span>
        </label> 
        <img className={`upload-image-preview ${showPreview && "upload-image-preview-show"}`} src={url} alt="upload-preview" />
      </div>
      {/* {showPreview && (
        <div className="image-preview-container">
        </div>
      )} */}
    </div>
  );
};
