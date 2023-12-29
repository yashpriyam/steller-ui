import "./PrivacyPolicy.scss";
const PrivacyPolicy = () => {
  return (
    <div className="privacy">
      <h1>Privacy Policy</h1>
      Privacy Policy for www.bewebmasters.com.
      <div>
        Last updated:{" "}
        {`${new Date(
          new Date().getTime() - 14 * 24 * 60 * 60 * 1000
        ).toDateString()}`}
      </div>{" "}
      WebMasters ("us", "we", or "our") operates the www.bewebmasters.com
      website (the "Service"). This page informs you of our policies regarding
      the collection, use, and disclosure of personal data when you use our
      Service and the choices you have associated with that data. Information
      Collection and Use We collect several different types of information for
      various purposes to provide and improve our Service to you. Types of Data
      Collected Personal Data: * While using our Service, we may ask you to
      provide us with certain personally identifiable information that can be
      used to contact or identify you ("Personal Data"). Personally identifiable
      information may include, but is not limited to: * Name * Email address *
      Phone number * Address * Cookies and Usage Data Use of Data WebMasters
      uses the collected data for various purposes: * To provide and maintain
      our Service * To notify you about changes to our Service * To provide
      customer support * To monitor the usage of our Service * To detect,
      prevent and address technical issues Transfer of Data Your information,
      including Personal Data, may be transferred to and maintained on computers
      located outside of your state, province, country or other governmental
      jurisdiction where the data protection laws may differ from those of your
      jurisdiction. If you are located outside Bhopal and choose to provide
      information to us, please note that we transfer the data, including
      Personal Data, to Bhopal and process it there. Your consent to this
      Privacy Policy followed by your submission of such information represents
      your agreement to that transfer. Security The security of your data is
      important to us, but remember that no method of transmission over the
      Internet or method of electronic storage is guaranteed to be 100% secure.
      While we employ industry-standard measures to protect your personal
      information, we cannot guarantee its absolute security. Cookies We use
      cookies and similar tracking technologies to track the activity on our
      Service and hold certain information. Cookies are files with a small
      amount of data that may include an anonymous unique identifier. Cookies
      are sent to your browser from a website and stored on your device. You can
      instruct your browser to refuse all cookies or to indicate when a cookie
      is being sent. However, if you do not accept cookies, you may not be able
      to use some portions of our Service. Links to Other Sites Our Service may
      contain links to other sites that are not operated by us. If you click on
      a third-party link, you will be directed to that third party's site. We
      strongly advise you to review the Privacy Policy of every site you visit.
      Changes to This Privacy Policy We may update our Privacy Policy from time
      to time. We will notify you of any changes by posting the new Privacy
      Policy on this page. Contact Us If you have any questions about this
      Privacy Policy, please contact us: * By email:
      contact@priyaminnovations.com * By visiting this page on our website:
      www.bewebmasters.com By using our website, you agree to the collection and
      use of information in accordance with this Privacy Policy.
    </div>
  );
};

export default PrivacyPolicy;
