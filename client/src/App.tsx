// import { DatePicker } from "./components/DatePicker/datePicker";
import { useTranslation } from "react-i18next";
import { LoginUI } from "./components/LoginUI/loginUI";
import React  from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";


const App = () => {
  return (
    <div>
      <LoginUI/>
       {/* <MonorepoIndex /> */}
    </div>
  );
};
export default App;
