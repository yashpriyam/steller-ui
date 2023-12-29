import React from 'react'
import "./TextComponent.scss";
const TextComponent = ({ children, className, ...props }) => {
  return <div className={"fontFamily " + className} {...props}>{children}</div>;
};

export default TextComponent
