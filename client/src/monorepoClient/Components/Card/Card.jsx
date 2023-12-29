import React from 'react'
import "./Card.scss"
const Card = ({ className, children, isActive=false, ...props }) => {
  return <div {...props} className={`defaultCardStyle ${isActive && "active"} ${className}`}>{children}</div>;
};

export default Card
