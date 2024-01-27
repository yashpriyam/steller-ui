import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import ImageComponent from "../ImageComponent/ImageComponent";
import MenuIcon from "../../assets/images/menuIcon.svg";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import { ThemeContext } from "../Themecontext/ThemeContext";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import ApplyNowButton from "../ApplyNowButton/ApplyNowButton";
import { Login } from "../../../components/Login/login";
import { Modal } from "../../../components/Modal/modal";

const googleAnalyticsButtonObj = {
  HeaderApplyButton: {
    action: "HeaderApplyButton",
    label: "clicked on header apply now button",
  },
  HeaderApplyButtonMobile: {
    action: "HeaderApplyButtonMobile",
    label: "clicked on header apply now button in mobile",
  },
};

const Navbar = ({
  isMenuOpen = false,
  setMenuOpen,
  profileMenuOptions = [],
  isLoggedIn = false,
}) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [themeValue, setThemeValue] = useState(darkMode ? "Light" : "Dark");
  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    setThemeValue(!darkMode ? "Light" : "Dark");
  };

  const [show, handleShow] = useState(false);
  const [id, setId] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const scrollEventListener = () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else handleShow(false);
    };
    window.addEventListener("scroll", scrollEventListener);
    return () => {
      window.removeEventListener("scroll", scrollEventListener);
    };
  }, []);
  const updateWidthAndHeight = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  const handleOnClickMenu = (id) => {
    setId(id);
    setMenuOpen(false);
  };
  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogin = () => setIsLoginModalOpen(true)
  return (
    <>
     {
      isLoginModalOpen && (<Modal> <Login closeModal={()=> setIsLoginModalOpen(false)}  /> </Modal>)
     }
      <div
        className={`nav-mono ${
          location.pathname !== "/register" && darkMode ? "nav__black" : ""
        } ${show && (darkMode ? "nav__black" : "nav__white")} ${
          darkMode ? "nav__text__white" : "nav__text__black"
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        {screenWidth > 800 ? (
          <>
            <Link to="/">
              <div className="leftPart">
                <Logo />
              </div>
            </Link>

            <div
              className={`centerPart ${
                location.pathname === "/register" && "centerPartRegister"
              }`}
            >
              <a href="/#Home">
                <div
                  onClick={() => handleOnClickMenu(0)}
                  className={`option ${id === 0 && "selected"}`}
                >
                  Home
                </div>
              </a>
              <a href="/#demo-week">
                <div
                  onClick={() => handleOnClickMenu(1)}
                  className={`option ${id === 1 && "selected"}`}
                >
                  Demo
                </div>
              </a>
              <a href="/#programs">
                <div
                  onClick={() => handleOnClickMenu(2)}
                  className={`option ${id === 2 && "selected"}`}
                >
                  Courses
                </div>
              </a>
              <a href="/#pricing">
                <div
                  onClick={() => handleOnClickMenu(3)}
                  className={`option ${id === 3 && "selected"}`}
                >
                  Pricing
                </div>
              </a>
              <a href="/#faq">
                <div
                  onClick={() => handleOnClickMenu(4)}
                  className={`option ${id === 4 && "selected"}`}
                >
                  FAQ'S
                </div>
              </a>
              <a href="/#jobs">
                <div
                  onClick={() => handleOnClickMenu(5)}
                  className={`option ${id === 5 && "selected"}`}
                >
                  Jobs
                </div>
              </a>
              <div className="toggler">
                <p
                  className={`nav-button ${
                    darkMode ? `themeBlack` : `themeWhite`
                  }`}
                >
                  {themeValue}
                </p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleTheme}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              {isLoggedIn 
              ? <ProfileMenu options={profileMenuOptions} />
              : <div
              onClick={handleLogin}
              className="option"
            >
              Login
       </div>}
              <div
                className={`${
                  location.pathname === "/register" && "hideButton"
                }`}
              >
                {!isLoggedIn && (
                  <>
                    <ApplyNowButton
                    googleAnalyticsObject={
                      googleAnalyticsButtonObj["HeaderApplyButton"]
                    }
                    linkTo={"register"}
                    openNewTab={false}
                  />
                </>
                )}
              </div>
            </div>
            <div className="rightPart"></div>
          </>
        ) : (
          <>
            <div className="topContainer">
              <Link to="/">
                <div className="leftPart">
                  <Logo />
                </div>
              </Link>

              <div onClick={handleMenuClick} className="rightPart">
                <ImageComponent
                  className={`arrowIcon ${darkMode ? `darkMode` : ``}`}
                  src={MenuIcon}
                  alt="MenuIcon"
                />
              </div>
            </div>
            {isMenuOpen && (
              <div
                className={`centerPart ${darkMode ? `darkMode` : ``} ${
                  isMenuOpen ? "isNavOpen" : ""
                }`}
              >
                <a href="/#Home">
                  <div
                    onClick={() => handleOnClickMenu(0)}
                    className={`option ${id === 0 && "selected"}`}
                  >
                    Home
                  </div>
                </a>
                <a href="/#demo-week">
                  <div
                    onClick={() => handleOnClickMenu(1)}
                    className={`option ${id === 1 && "selected"}`}
                  >
                    Demo
                  </div>
                </a>
                <a href="/#programs">
                  <div
                    onClick={() => handleOnClickMenu(2)}
                    className={`option ${id === 2 && "selected"}`}
                  >
                    Courses
                  </div>
                </a>
                <a href="/#pricing">
                  <div
                    onClick={() => handleOnClickMenu(3)}
                    className={`option ${id === 3 && "selected"}`}
                  >
                    Pricing
                  </div>
                </a>
                <a href="/#faq">
                  <div
                    onClick={() => handleOnClickMenu(4)}
                    className={`option ${id === 4 && "selected"}`}
                  >
                    FAQ'S
                  </div>
                  <a href="/#jobs">
                <div
                  onClick={() => handleOnClickMenu(5)}
                  className={`option ${id === 5 && "selected"}`}
                >
                  Jobs
                </div>
              </a>
                </a>
                <div className="toggler">
                  <p
                    className={`nav-button ${
                      darkMode ? `themeBlack` : `themeWhite`
                    }`}
                  >
                    {themeValue}
                  </p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onClick={handleTheme}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                {
                  !isLoggedIn && (<div
                    onClick={handleLogin}
                    className="option"
                  >
                    Login
               </div>)
                }
                {isLoggedIn ? (
                  <ProfileMenu options={profileMenuOptions} />
                ) : (
                  <ApplyNowButton
                    googleAnalyticsObject={
                      googleAnalyticsButtonObj["HeaderApplyButtonMobile"]
                    }
                    linkTo={"register"}
                    openNewTab={false}
                  />
                  // <Link
                  //   to="/register"
                  //   // {{
                  //   //   pathname: "https://i1k3byg41st.typeform.com/to/hxhM5WeN",
                  //   // }}
                  //   // target="_blank"
                  //   style={{ textDecoration: "none" }}
                  // >
                  //   <ButtonComponent
                  //     className="applybtn"
                  //     onClick={() => {
                  //       googleAnalyticsButton(
                  //         googleAnalyticsButtonObj["HeaderApplyButtonMobile"]
                  //       );
                  //     }}
                  //   >
                  //     Apply Now 345
                  //     <ImageComponent
                  //       className="arrowIcon"
                  //       src={RightArrow}
                  //       alt="rightArrow"
                  //     />
                  //   </ButtonComponent>
                  // </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
