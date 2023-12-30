import React from 'react'
import "./ImageComponent.scss";
const ImageComponent = ({src, alt, className,...props}) => {
    return (
        <img
          src={src}
          alt={alt}
          className={className}
          {...props}
        />
    );
}

export default ImageComponent
