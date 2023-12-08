import { DatePicker } from "./components/DatePicker/datePicker";
import { Button } from "./components/button/button";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("greeting")}</h1>
      <DatePicker label="Date Picker" labelPosition="left" isRequired={true} minDate="2023-12-08" />
    </div>
  );
};

export default App;
