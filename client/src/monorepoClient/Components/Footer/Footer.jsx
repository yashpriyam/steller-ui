import React, { useContext } from "react";
import ImageComponent from "../ImageComponent/ImageComponent";
import TextComponent from "../TextComponent/TextComponent";
// import LinkedIn from "../../assets/images/linkedIn.svg";
// import Facebook from "../../assets/images/facebook.svg";
// import Instagram from "../../assets/images/instagram.svg";
// import Twitter from "../../assets/images/twitter.svg";
import CallIcon from "../../assets/images/callIcon.svg";
import EmailIcon from "../../assets/images/emailIcon.svg";
import AdressIcon from "../../assets/images/addressIcon.svg";
import Logo from "../Logo/Logo";
import "./Footer.scss";
import { ThemeContext } from "../Themecontext/ThemeContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "footer footerBlack" : "footer footerWhite"}>
      <div className="column one">
        <Logo width="150px" />
        <TextComponent className="description">
          {" "}
          Become a Top Notch Software Developer.
        </TextComponent>
        {/* <div className="socialLinks">
          <ImageComponent src={Facebook} alt={"Facebook"} />
          <ImageComponent src={Instagram} alt={"Instagram"} />
          <ImageComponent src={LinkedIn} alt={"LinkedIn"} />
          <ImageComponent src={Twitter} alt={"Twitter"} />
        </div> */}
      </div>
      <div className="columnGroup">
        <div className="column">
          <p className="heading">Links</p>
          <p>
            <a href="/#Home">Home</a>
          </p>
          <p>
            <a href="/#demo-week">Demo</a>
          </p>
          <p>
            <a href="/#faq">FAQ's</a>
          </p>
          <p>
            <a href="/#pricing">Pricing</a>
          </p>
          <p>
            <a href="/#programs">Courses</a>
          </p>
          <p>
            <a href="/#jobs">Jobs</a>
          </p>
        </div>
        <div className="column">
          <p id="contact-us" className="heading">
            Contact Us
          </p>
          <div className="contactLink">
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d404.47429496545516!2d77.46567808478822!3d23.25112226936742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43d4e34b978d%3A0x752d37d81bc1ac4!2sWebMasters!5e0!3m2!1sen!2sin!4v1699013109312!5m2!1sen!2sin"
                // width="600"
                // height="450"
                title="webmasters"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Link
              to={{ pathname: "https://maps.app.goo.gl/Yt6Z4RQMWUhDbgHg8/" }}
              target="_blank"
            >
              <p className="contactHeading">
                <ImageComponent
                  className="linkImage"
                  src={AdressIcon}
                  alt={"AdressIcon"}
                />{" "}
                Address
              </p>
              <p>245, D.R.V.S Apartment, Sector C, Indrapuri, Bhopal</p>
            </Link>
          </div>
          <div className="contactLink">
            <Link to={{ pathname: `tel:${+917000829802}` }} target="_blank">
              <p className="contactHeading">
                <ImageComponent
                  className="linkImage"
                  src={CallIcon}
                  alt={"CallIcon"}
                />{" "}
                Call
              </p>
              <p>+91 - 700 082 9802</p>
            </Link>
          </div>
          <div className="contactLink">
            <Link
              to={{ pathname: `mailto:contact@priyaminnovations.com` }}
              target="_blank"
            >
              <p className="contactHeading">
                <ImageComponent
                  className="linkImage"
                  src={EmailIcon}
                  alt={"EmailIcon"}
                />{" "}
                Email
              </p>
              <p>contact@priyaminnovations.com</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
