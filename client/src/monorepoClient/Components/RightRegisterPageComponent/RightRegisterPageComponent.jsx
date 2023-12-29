import React, { useState } from "react";
import { ButtonComponent } from "../Button/Button";
import "./RightRegisterPageComponent.scss";
import FormComponent from "../FormComponent/FormComponent";
import LoadingComponent from "../loading/Loading.Component";
import Banner from "../Banner/Banner";
import { localMessages } from "../../helpers/constants/localMessages";
// import { formNamesArray } from "../../Components/FormComponent/FormData.js";

const RightRegisterPageComponent = ({
  setFormData,
  formStep,
  handleSubmitForm = () => {},
  setFinishedPage,
  isLoading,
  sendOtp,
  showSendOtpButton,
}) => {
  const [resetForm, setResetForm] = useState(false);
  // const [paymentStatus, setPaymentStatus] = useState(false);
  return (
    <div className="RightRegisterPageComponent">
      <div className="container">
        <div className="topText">
          <h3 className="heading">Takes only 1 minute.</h3>
        </div>
        <div className="bannerWrapperContainerRegisterPage">
          <Banner text={localMessages.BANNER_NEXT_BATCH_TEXT} />
        </div>
        <FormComponent
          className="inputContainer"
          setFormData={setFormData}
          formStep={formStep}
          setFinishedPage={setFinishedPage}
          resetForm={resetForm}
        />
        {showSendOtpButton && (
          <>
            <br />
            <ButtonComponent onClick={sendOtp} className="resendOtpBtn">
              Resend otp
            </ButtonComponent>
          </>
        )}
        {
          <div className={`submitButton`}>
            <div className="buttons">
              <ButtonComponent
                onClick={() => setResetForm((prev) => !prev)}
                className="resetBtn"
              >
                Reset
              </ButtonComponent>

              <ButtonComponent
                onClick={() => handleSubmitForm(true, setResetForm)}
                className="submitBtn"
              >
                {isLoading ? <LoadingComponent /> : "Submit"}
              </ButtonComponent>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default RightRegisterPageComponent;
