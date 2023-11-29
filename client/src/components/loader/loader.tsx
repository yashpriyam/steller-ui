import React from "react";
import './loader.scss'

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
    
    return (
        <div className={`loader-component ${className}`}></div>
    );
}