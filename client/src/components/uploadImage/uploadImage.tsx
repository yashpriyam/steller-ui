import React, { MouseEventHandler, CSSProperties, ReactNode, FC, MouseEvent, ChangeEventHandler } from "react";
import "./uploadImage.scss";
interface UploadImageProps {
  className?: string;
  disable?: boolean;
  multiple?: boolean;
  text?: string | ReactNode;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
export const UploadImage: FC<UploadImageProps> = ({
  className,
  disable,
  multiple = false,
  text = "Upload Image",
  style,
  onChange,
}: UploadImageProps) => {
  return (
    <div
      className={`upload-image-main-container ${className} ${disable && "upload-image-disabled"}`}
      style={style}
    >
      <input
        type="file"
        multiple={multiple}
        id="file-type"
        style={{ display: "none" }}
        onChange={onChange}
      />
      <label className="upload-image-label" htmlFor="file-type">
        <span>{text}</span>
      </label>
    </div>
  );
};
