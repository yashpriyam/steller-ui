import React from 'react'
import "./Avatar.scss"
import DefaultAvatar from "../../assets/images/avatar.svg"
import ImageComponent from "../ImageComponent/ImageComponent";
const Avatar = ({src, alt, className}) => {
    return (
      <div className="avatar">
        {src ? (
          <ImageComponent
            className={"defaultAvatar " + className}
            src={src}
            alt={alt}
            onError={(e) => {
              e.target.src = DefaultAvatar;
            }}
          />
        ) : (
          <ImageComponent
            className={"defaultAvatar " + className}
            src={DefaultAvatar}
            alt={"Default"}
          />
        )}
      </div>
    );
}

export default Avatar
