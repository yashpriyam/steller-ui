import React, { useContext } from "react";
import "./FaqComponent.scss";
import TextComponent from "../TextComponent/TextComponent";
import ImageComponent from "../ImageComponent/ImageComponent";
import RightSubscriptionCircle from "../../assets/images/rightSubscriptionCircle.svg";
import leftSubscriptionCircle from "../../assets/images/leftSubscriptionCircle.svg";
import DropDownComponent from "../DropDownComponent/DropDownComponent";
import { ThemeContext } from "../Themecontext/ThemeContext";
import { faqData } from "../../helpers/faqContent/faqData";

const FaqComponent = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      id="faq"
      className={
        darkMode
          ? "faqComponent faqComponentBlack"
          : "faqComponent faqComponentWhite"
      }
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
        <h2>Frequently Asked Questions (FAQs)</h2>
        <p>Lets sort your doubts.</p>
      </TextComponent>
      <div className="dropDownList">
        {faqData.map(({ question, answer, id }) => (
          <DropDownComponent
            key={id}
            id={id}
            question={question}
            answer={answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqComponent;
