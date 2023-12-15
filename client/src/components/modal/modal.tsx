import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss'

export interface ModalProps {
    className?: string;
    style?: React.CSSProperties;
    bgColor?: string;
    children?: React.ReactNode;
    isClosable?: boolean;
    onClose?: () => void;
    isOpen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    className,
    style,
    bgColor,
    children,
    isClosable,
    onClose,
    isOpen
}: ModalProps) => {


    const handleClose = () => {
        onClose && onClose();
    }

    return <>
        {
            isOpen && createPortal(
                <div style={{ ...style, background: bgColor }} className={`modal-container ${className}`}>
                    <button className={`close-button ${className}`} onClick={handleClose}>✖️</button>
                    {children}
                </div>,
                document.body
            )
        }
    </>
}