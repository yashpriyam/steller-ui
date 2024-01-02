import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Registerpage from "./Pages/Registerpage/Registerpage";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";
import { AppStateContext } from "./AppState/appState.context";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import DummyComponentForWhatsapp from "./helpers/utils/dummyComp";
import { useUserActivity } from "../redux/actions/userActivityAction";
import { deleteCookieByKey } from "../utils/index";

function MonorepoApp() {
  // Google Analytics Id
  const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
  ReactGA.initialize(googleAnalyticsId);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { setIsLoggedIn, isLoggedIn } = useContext(AppStateContext);
  const phoneNumber = new URLSearchParams(window.location.search)?.get("n");
  const { upsertUserActivity } = useUserActivity();

  const userActivityRequest = async () => {
    try {
      await upsertUserActivity({
        phoneNumber,
        isOpened: true
      })
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    userActivityRequest();
    ReactGA._gaCommandSendPageview(document.location.pathname);
    // eslint-disable-next-line
  }, []);

  const profileMenuOptions = [
    {
      value: "Log out",
      onClick: () => {
        deleteCookieByKey(process.env.REACT_APP_JWT_SECRET_KEY);
        setIsLoggedIn(false);
      },
    },
  ];

  return (
    <div className="App" onClick={() => setMenuOpen(false)}>
      <ToastContainer />
        <Navbar
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          profileMenuOptions={profileMenuOptions}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
          
            path="/privacy/concerns/whatsapp"
            element={DummyComponentForWhatsapp}
          />
        </Routes>
    </div>
  );
}

export default MonorepoApp;
