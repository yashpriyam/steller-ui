import ReactGA from "react-ga4";

export const googleAnalyticsButton = ({ action, label }) => {
  ReactGA.event({
    category: "Button",
    action,
    label,
  });
};
