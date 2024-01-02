import { Link } from "react-router-dom";
import { googleAnalyticsButton } from "../../helpers/utils/googleAnalyticsButton";
import "./ApplyNowButton.scss";
import { ButtonComponent } from "../Button/Button";
import ImageComponent from "../ImageComponent/ImageComponent";
import RightArrow from "../../assets/images/rightArrow.svg";

const ApplyNowButton = ({
  googleAnalyticsObject = {
    action: "DefaultAnalyticsButton",
    label: "default event",
  },
  linkTo = "register",
  openNewTab = false,
}) => {
  const linkToProps = openNewTab
    ? {
        to: {
          pathname: "https://i1k3byg41st.typeform.com/to/hxhM5WeN",
        },
        target: "_blank",
      }
    : { to: `/${linkTo}` };

  return (
    <Link {...linkToProps} style={{ textDecoration: "none" }}>
      <ButtonComponent
        className="applybtn"
        onClick={() => {
          googleAnalyticsButton(googleAnalyticsObject);
        }}
      >
        Apply Now
        <ImageComponent
          className="arrowIcon"
          src={RightArrow}
          alt="rightArrow"
        />
      </ButtonComponent>
    </Link>
  );
};

export default ApplyNowButton;
