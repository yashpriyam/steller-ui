import React, { useContext } from "react";
import "./Testimonials.scss";
import TextComponent from "../TextComponent/TextComponent";
import ImageComponent from "../ImageComponent/ImageComponent";
import RightSubscriptionCircle from "../../assets/images/rightSubscriptionCircle.svg";
import leftSubscriptionCircle from "../../assets/images/leftSubscriptionCircle.svg";
import { ThemeContext } from "../Themecontext/ThemeContext";
import whatsapp_chat_5 from "../../assets/images/whatsapp_chat_5.png";
import whatsapp_chat_4 from "../../assets/images/whatsapp_chat_4.png";
import whatsapp_chat_3 from "../../assets/images/whatsapp_chat_3.png";
import whatsapp_chat_2 from "../../assets/images/whatsapp_chat_2.png";
import whatsapp_chat_1 from "../../assets/images/whatsapp_chat_1.png";

const CoursePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const screenShotSrcMap = [
    {
      imgSrc: whatsapp_chat_5,
    },
    {
      imgSrc: whatsapp_chat_4,
    },
    {
      imgSrc: whatsapp_chat_3,
    },
    {
      imgSrc: whatsapp_chat_2,
    },
    {
      imgSrc: whatsapp_chat_1,
    },
  ];

  return (
    <div
      id="programs"
      className={
        darkMode
          ? "faqComponent faqComponentBlack"
          : "faqComponent faqComponentWhite"
      }
      style={{
        background: "var(--light-red)",
      }}
    >
      <ImageComponent
        className="rightSubscriptionCircle"
        src={RightSubscriptionCircle}
        alt="rightsubscrtiptionCircle"
      />
      <ImageComponent
        className="leftSubscriptionCircle"
        src={leftSubscriptionCircle}
        alt="LeftSubscriptionCircle"
      />
      <TextComponent className="planDescription">
        <h2>Testimonials</h2>
        {/* <p>Lets sort your doubts.</p> */}
      </TextComponent>
      <TextComponent className="planDescription">
        <h2>Placements at Web Masters...</h2>
        {/* <p>Lets sort your doubts.</p> */}
      </TextComponent>
      <div className="testimonials">
        {screenShotSrcMap.map(({ imgSrc }, idx) => (
          <div className="testimonial-container" key={idx + 1}>
            <img className="testimonials-img" src={imgSrc} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
