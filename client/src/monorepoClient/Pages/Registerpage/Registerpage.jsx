import React, { useContext, useEffect, useState } from "react";
import "./Registerpage.scss";
import { AppStateContext } from "../../AppState/appState.context";
import { useNavigate } from "react-router-dom";
import LeftRegisterPageComponent from "../../Components/LeftRegisterPageComponent/LeftRegisterPageComponent";
import RightRegisterPageComponent from "../../Components/RightRegisterPageComponent/RightRegisterPageComponent";
import Toast from "../../helpers/utils/toast";
import { ThemeContext } from "../../Components/Themecontext/ThemeContext";
import {
  isValidEmail,
  isValidPhoneNumber,
} from "../../helpers/utils/validations";
import { objectToBase64 } from "../../helpers/utils/base64Utils";
import { setCookie } from "../../helpers/utils/cookieUtils";
import { useUser } from "../../../redux/actions/userAction";

const Registerpage = () => {
  const [formData, setFormData] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [finishedPage, setFinishedPage] = useState(0);
  const isEmailValid = isValidEmail(formData.email);
  const { darkMode } = useContext(ThemeContext);
  const { authenticateStateAndDispatch, setIsLoggedIn } = useContext(AppStateContext);
  const userDataCookieName = "userData";
  const { registerUser } = useUser();
  const dispatcher =
    Object.keys(authenticateStateAndDispatch[0]).length !== 0
      ? authenticateStateAndDispatch[1]
      : () => {};
  const validateFormFields = () => {
    const { email, name, phonenumber, otp } = formData;
    if (!name.length || !email.length || !phonenumber.length) {
      Toast.error("Please fill all the required fields");
    } else {
      if (isEmailValid) {
        if (isValidPhoneNumber(phonenumber)) {
          return true;
        } else {
          Toast.error("Please enter correct phone number");
        }
      } else {
        Toast.error("Please enter correct email address");
      }
    }
    return false;
  };
  const handleSubmitForm = async (isNext = false, setResetForm) => {
    if (validateFormFields()) {
      try {
        setIsLoading(true);
        setCookie({ key: userDataCookieName, value: objectToBase64(formData) });
        const { name, currentprofessionalstatus, email, otp, phonenumber, whatsagoodsalarythatcanmotivateyoutoacceptajoboffer, youwouldattendtheclassesonlineoroffline, whichcollegeyouarefrom } = formData;
        const response = await registerUser({
          name,
          email,
          phoneNumber: phonenumber,
          occupation: currentprofessionalstatus,
          expectedSalary: whatsagoodsalarythatcanmotivateyoutoacceptajoboffer,
          sessionPreference: youwouldattendtheclassesonlineoroffline.toLowerCase() === 'online' ? 'online' : "offline",
          isJobSeeker: true,
          collegeName: whichcollegeyouarefrom
        })
        if (response?.response.data?.registerUser?.response?.status === 400) {
          Toast.warning("Email is already registered. You can login");
        } else {
          dispatcher({ type: "SUBMIT_FORM", payload: response.response.data.registerUser.userData});
          Toast.success("Form Submitted Successfully");
          setFormData("");
          setResetForm((prev) => !prev);
          setIsLoggedIn(true);
          navigate("/#Home");
        }
      } catch (e) {
        Toast.error("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  const handleClick = (currentForm) => {
    setFormStep(currentForm);
  };

  return (
    <div
      className={
        darkMode
          ? "registerPageWrapper registerPageWrapperBlack"
          : "registerPageWrapper registerPageWrapperWhite"
      }
    >
      <div className="registerPage">
        <LeftRegisterPageComponent
          handleClick={handleClick}
          formStep={formStep}
          finishedPage={finishedPage}
          handleSubmitForm={handleSubmitForm}
        />
        <RightRegisterPageComponent
          setFormData={setFormData}
          formStep={formStep}
          handleSubmitForm={handleSubmitForm}
          setFormStep={setFormStep}
          setFinishedPage={setFinishedPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
export default Registerpage;
