import React from "react";
import '../../styles/components/loader.scss'

interface ModalProps {
  className?: string;
}

export const Loader: React.FC<ModalProps> = ({className="loader"}) => {
    
    return (
        <div className={className}></div>
    );
}