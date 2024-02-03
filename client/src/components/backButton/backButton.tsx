import React from "react";
import { useNavigate } from "react-router-dom";
import "./backButton.scss";
import { useTranslation } from "react-i18next";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      {t('back')}
    </button>
  );
};
