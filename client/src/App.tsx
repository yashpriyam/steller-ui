import { DatePicker } from "./components/DatePicker/datePicker";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("greeting")}</h1>
      <DatePicker label="Date Picker" labelPosition="left" isRequired={true} maxDate="2023-12-08" minDate="2022-11-09" icon="📆"/>
    </div>
  );
};

export default App;
