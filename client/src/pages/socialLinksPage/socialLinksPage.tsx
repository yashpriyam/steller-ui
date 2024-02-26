import React from "react";
import { useParams } from "react-router-dom";
import "./socialLinksPage.scss";
import { useUser } from "../../redux/actions/userAction";
import NoDataFoundComponent from "../../components/noDataFound/noDataFound";

const SocialLinksPage = () => {
  const { link } = useParams();

  const socialPlatformName = link ?? "";

  const { user } = useUser();

  const socialLinks =
    user?.userData?.socialLinks &&
    Object.entries(user?.userData?.socialLinks)
      .map(([socialPlatform, link]) => {
        if (socialPlatformName === socialPlatform) {
          return link.response;
        }
        return false;
      })
      .filter((link) => link)[0];

  return (
    <div className="social-links-page">
      {Boolean(socialLinks) ? (
        <div className="social-link-page-container">
          
          <div className="social-links-page__iframe-container">
            <iframe
              src={socialLinks}
              title="Embedded Content"
              className="social-links-page__iframe"
            />
          </div>
        </div>
      ) : (
        <NoDataFoundComponent message="No Links Found" />
      )}
    </div>
  );
};

export default SocialLinksPage;
