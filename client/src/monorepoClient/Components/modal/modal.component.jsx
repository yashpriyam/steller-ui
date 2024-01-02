import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../../CustomHooks/useClickOutside";
import useCloseOnEsc from "../../CustomHooks/useCloseOnEsc";
import "./modal.style.scss";

export const Modal = ({
  children,
  onClickOutside = () => {},
  onEscPress = () => {},
}) => {
  const portalRoot = document.getElementById("portal-root");
  const el = document.createElement("div");
  const modalRef = useRef();
  // close modal when clicked outside
  const onClickOutsideModal = () => {
    return onClickOutside();
  };
  useClickOutside(modalRef, onClickOutsideModal);

  //close modal on esc
  const onEsc = (e) => {
    return onEscPress();
  };
  useCloseOnEsc(onEsc);

  useEffect(() => {
    portalRoot.appendChild(el);
    return () => portalRoot.removeChild(el);
  }, [el, portalRoot]);
  return ReactDOM.createPortal(
    <div className="modal-background">{children}</div>,
    el
  );
};
