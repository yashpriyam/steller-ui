import { useTranslation } from "react-i18next";
import React  from "react";


const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("greeting")}</h1>
    </div>
  );
};

export default App;
