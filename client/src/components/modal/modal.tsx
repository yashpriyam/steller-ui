 import React,{ useState } from 'react';
import {  createPortal } from 'react-dom';
import './modal.scss'

export interface ModalProps {
    className?: string;
    style?: object;
    bgColor?: string;
    children?: React.ReactNode;
    isClosable?: boolean;
    defaultSelected?: string;
    onClose?:()=>void ;
    isOpen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    className,
    style,
    bgColor,
    children,
    isClosable = false,
    onClose,
    isOpen 
}:ModalProps)=>{


    const toHandleCloseButton = () =>{
        onClose && onClose();
    }

    return isOpen ? createPortal(
        <div style={{...style, background:bgColor}} className={`modal-container ${className}`}>
                <button style={style} className = {`close-button ${className}`} onClick={toHandleCloseButton}>✖️</button>
                {children}
        </div>,
        document.body
    ) : (<></>)
}
