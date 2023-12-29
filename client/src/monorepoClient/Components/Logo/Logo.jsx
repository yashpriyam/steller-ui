import React, { useState, useEffect, useContext } from "react";
import "./Logo.scss";
import ImageComponent from "../ImageComponent/ImageComponent";
import LogoImage from "../../assets/images/Logo.svg";
import WhiteLogo from "../../assets/images/whiteLogo.svg";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../Themecontext/ThemeContext";

const Logo = ({ width, height }) => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [logo, setLogo] = useState(LogoImage);
  const [pathName, setPathName] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register") {
      setPathName(true);
    } else {
      setPathName(false);
    }
  }, [location.pathname, darkMode]);

  useEffect(() => {
    const scroll = () => {
      if (pathName) {
        if (darkMode) {
          setLogo(WhiteLogo);
        } else {
          if (window.scrollY > 50) {
            setLogo(LogoImage);
          } else {
            setLogo(WhiteLogo);
          }
        }
      } else if (darkMode) {
        setLogo(WhiteLogo);
      } else {
        setLogo(LogoImage);
      }
    };
    scroll();
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [pathName, darkMode]);
  return (
    <>
      <ImageComponent
        className="logoDefault"
        src={logo}
        alt={"logo"}
        style={{ width, height }}
      />
    </>
  );
};

export default Logo;
