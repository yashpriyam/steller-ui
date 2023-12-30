// import { DatePicker } from "./components/DatePicker/datePicker";
import { useTranslation } from "react-i18next";
import React  from "react";
import { LoginUI } from "./components/LoginUI/loginUI";


const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* <h1>{t("greeting")}</h1> */}
      {/* <DatePicker label="Date Picker" labelPosition="left" isRequired={true} maxDate="2023-12-12" minDate="2011-01-01" icon="📆"/> */}
      <LoginUI/>
    </div>
  );
};
export default App;
