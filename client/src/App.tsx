import { useTranslation } from "react-i18next";
import Scheduling from "./pages/scheduling/scheduling";
import './App.scss';
import Navbar from "./components/navbar/navbar";

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="app-container">
      {/* <h1>{t("greeting")}</h1> */}
      <Navbar />
      <Scheduling />
    </div>
  );
};
export default App;
