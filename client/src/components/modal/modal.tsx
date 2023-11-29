import React from 'react';
import { createPortal } from 'react-dom'; // Import createPortal from react-dom

interface ModalProps {
  isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body // Use modalRoot as the container for portal rendering
  );
};

export default Modal;
