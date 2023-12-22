import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Registerpage from "./Pages/Registerpage/Registerpage";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";
import useHttp from "./CustomHooks/useHttp";
import { AppStateContext } from "./AppState/appState.context";
import Toast from "./helpers/utils/toast";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import DummyComponentForWhatsapp from "./helpers/utils/dummyComp";

function MonorepoApp() {
  // Google Analytics Id
  const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
  ReactGA.initialize(googleAnalyticsId);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { sendRequest } = useHttp();
  const { setIsLoggedIn, isLoggedIn } = useContext(AppStateContext);
  const phoneNumber = new URLSearchParams(window.location.search)?.get("n");

  const userActivityRequest = async () => {
    try {
      await sendRequest("/api/userActivity/upsert", "post", {
        phoneNumber,
        isOpened: true,
      });
    } catch (err) {
      console.log({ err });
    }
  };

  const logOutRequest = async () => {
    try {
      const response = await sendRequest("/api/auth/logout");
      if (response?.status === 200) {
        Toast.success(`Logged out successfully.`);
      } else {
        Toast.error(`something went wrong`);
      }
    } catch (err) {
      console.log({ err });
      Toast.error("something went wrong");
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
        logOutRequest();
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
