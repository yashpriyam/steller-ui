import React, { useContext, useEffect, useState } from "react";
import "./TopBanner.scss";
import { ThemeContext } from "../Themecontext/ThemeContext";
import { AppStateContext } from "../../AppState/appState.context";
import ApplyNowButton from "../ApplyNowButton/ApplyNowButton";

const googleAnalyticsButtonObj = {
  BannerApplyButton: {
    action: "BannerApplyButton",
    label: "clicked on banner apply now buton",
  },
};

const TopBanner = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AppStateContext);
  const [shiftApply, setShiftApply] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 550) {
        setShiftApply(true);
      } else setShiftApply(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      id="Home"
      className={
        darkMode ? "topBanner topBannerBlack" : "topBanner topBannerWhite"
      }
    >
      <div className="bannerContainer">
        <div className="heading">
          <h1>
            Master{" "}
            <span
              style={{
                fontStyle: "bold",
                color: "#ed303c",
              }}
            >
              {"{ Full-Stack } "}
            </span>
            Web development in <br />
            <span
              style={{
                fontStyle: "bold",
                color: "#2a9d8f",
              }}
            >
              4-months.
            </span>
            <br />
            Assured{" "}
            <span
              style={{
                fontStyle: "bold",
                color: "#ed303c",
              }}
            >
              JOB
            </span>{" "}
            placement.
          </h1>
        </div>
        {/* <div className="description">
          <p>
            Get access to premium jobs, Become a top notch{" "}
            <span
              style={{
                fontStyle: "bold",
                color: "green",
              }}
            >
              Software developer.
            </span>{" "}
          </p>
        </div> */}
        {!isLoggedIn && (
          <div className={`button ${shiftApply && "shiftButton"}`}>
            <ApplyNowButton
              googleAnalyticsObject={
                googleAnalyticsButtonObj["BannerApplyButton"]
              }
              linkTo={"register"}
              openNewTab={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBanner;
