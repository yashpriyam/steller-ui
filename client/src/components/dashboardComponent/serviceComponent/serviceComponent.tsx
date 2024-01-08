import React, { ReactElement } from "react";
import "./serviceComponent.scss";

export type ServiceBox = {
  icon: ReactElement;
  title: string;
  subtitle: string;
  button_text: string;
};

interface serviceComponentProps {
  service_elements?: ServiceBox[];
}

export const ServiceCompomponent: React.FC<serviceComponentProps> = ({
  service_elements = [],
}: serviceComponentProps) => {
  const serviceElements = service_elements.map((obj, idx) => {
    return (
      <div className="service_elements">
        <div className="service-icon-box">{obj.icon}</div>
        <div className="service-text">
          <p className="service-title">{obj.title}</p>
          <p className="service-subtitle">{obj.subtitle}</p>
        </div>
        <button className="service-button">{obj.button_text}</button>
      </div>
    );
  });

  return <div className={`service-container`}>{serviceElements}</div>;
};
