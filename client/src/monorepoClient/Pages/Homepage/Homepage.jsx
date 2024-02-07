import React from "react";
import FaqComponent from "../../Components/FaqComponent/FaqComponent";
import CoursePage from "../../Components/CoursePage/CoursePage";
import Footer from "../../Components/Footer/Footer";
import PreviewImages from "../../Components/PreviewImages/PreviewImages";
import TopBanner from "../../Components/TopBanner/TopBanner";
import Testimonials from "../../Components/Testimonials/Testimonials";
// import Banner from "../../Components/Banner/Banner";
import "./Homepage.scss";
import { localMessages } from "../../helpers/constants/localMessages";
// import JobBoard from "../../Components/JobBoard/JobBoard";

const Homepage = () => {
  return (
    <>
      {/* <Banner
        className={`bannerWrapperContainer`}
        text={localMessages.BANNER_NEXT_BATCH_TEXT}
      /> */}
      <PreviewImages />
      <TopBanner />
      <CoursePage />
      <Testimonials />
      {/* <JobBoard /> */}
      <FaqComponent />
      <Footer />
    </>
  );
};

export default Homepage;
