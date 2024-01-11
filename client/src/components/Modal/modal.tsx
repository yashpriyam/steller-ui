import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

export const Modal: React.FC<ModalProps> = ({
  className,
  style,
  bgColor,
  children,
  isClosable,
  onClose,
  isOpen=true,
}: ModalProps) => {
    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isOpen]);
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            style={{ ...style, background: bgColor }}
            className={`modal-container ${className}`}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};
