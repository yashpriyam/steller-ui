import React from "react";
import "./serviceComponent.scss";

export const ServiceCompomponent: React.FC<ServiceComponentProps> = ({
  serviceElements = [],
}: ServiceComponentProps) => {
  const serviceData = serviceElements.map((items, idx) => {
    return (
      <div className="service_elements">
        <div className="service-icon-box">{items.icon}</div>
        <div className="service-text">
          <p className="service-title">{items.title}</p>
          <p className="service-subtitle">{items.subtitle}</p>
        </div>
        <button disabled={!items?.isBtnEnabled} onClick={()=> items.onClick && items.onClick()} className="service-button">{items.buttonText}</button>
      </div>
    );
  });

  return <div className={`service-container`}>{serviceData}</div>;
};
