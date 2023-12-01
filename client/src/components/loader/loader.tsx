import React from "react";
import './loader.scss'

interface LoaderProps {
  className?: string;
  style?: object;
}

export const Loader: React.FC<LoaderProps> = ({ className,style }) => {
    
    return (
        <div className={`loader-component ${className}`} style={style}></div>
    );
}