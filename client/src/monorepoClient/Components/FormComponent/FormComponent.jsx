import React, { useState, useContext, useEffect, useLayoutEffect } from "react";

import InputComponent from "../InputComponent/InputComponent";
import { AppStateContext } from "../../AppState/appState.context";
import useHttp from "../../CustomHooks/useHttp";
// import PaymentButtonComponent from "../PaymentButtonComponent/PaymentButtonComponent";
import Toast from "../../helpers/utils/toast";
import { useFormData } from "./FormData";
import { useBatch } from "../../../redux/actions/batchAction";


const formStepForBackend = {
  1: "personalForm",
  2: "professionalForm",
  3: "skillForm",
  4: "paymentForm",
};

const FormComponent = ({
  className,
  formStep,
  setFormData,
  setFinishedPage,
  resetForm,
  // paymentStatus,
  // setPaymentStatus,
}) => {

  function createFormFieldValueMap(formStep, parentFormsByName) {
    return {
      ...parentFormsByName[parentFormStepMap[formStep]]?.reduce(
        (a, b) => ({
          ...a,
          [b["labelId"]]: b.defaultValue ? b.defaultValue : "",
        }),
        {}
      ),
    };
  }
  const { batchData, getBatchCode } = useBatch();
  const { batchCode, startDate } = batchData ? batchData[0] : {};
  useEffect(()=> {
    getBatchCode();
  },[ batchCode, startDate ])
  const {formNameStepMap, formNamesArray, parentFormStepMap, parentFormsByName} = useFormData({ batchCode, startDate })
  const [formFieldValueMap, setFormFieldValueMap] = useState(
    createFormFieldValueMap(formStep, parentFormsByName)
  );
  const [storedFormData, setStoredFormData] = useState("");
  const { sendRequest } = useHttp();
  const { authenticateStateAndDispatch } = useContext(AppStateContext);
  const userInfo =
    Object.keys(authenticateStateAndDispatch[0]).length !== 0
      ? JSON.parse(authenticateStateAndDispatch[0])
      : {};



     

      //

      //

  useLayoutEffect(() => {
    if (userInfo.haveForm && userInfo.id) {
      sendRequest(`/api/register/getUserForm`, "get")
        .then((res) => {
          setFinishedPage(res.data.length - 1);
          const resDataObject =
            res.data[formStep - 1][formStepForBackend[formStep]];
          const { _id, __v, createdAt, updatedAt, ...filteredResData } =
            resDataObject;
          setStoredFormData({
            ...formFieldValueMap,
            ...filteredResData,
          });
          // setPaymentStatus(res.data[3].paymentForm.paymentInfo);
          // I've added it here just for your reference.
          // The form data that you get back from api
          // needs to be passed to setFormData here
          return;
        })
        .catch((e) => {
          console.error(e);
        });
    }
    // eslint-disable-next-line
  }, [formStep]);

  useEffect(() => {
    setFormFieldValueMap({ ...createFormFieldValueMap(formStep, parentFormStepMap) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm]);

  useEffect(() => {
    setFormFieldValueMap({
      ...createFormFieldValueMap(formStep, parentFormStepMap),
      ...storedFormData,
      selectyourpreferredbatch: batchCode,
    });
    // eslint-disable-next-line
  }, [formStep, storedFormData, batchData]);

  useEffect(() => {
    setFormData(formFieldValueMap);
    // eslint-disable-next-line
  }, [formFieldValueMap, batchData]);

  function formInputHandlerHOC(formInputs) {
    return function (value) {
      setFormFieldValueMap((prev) => ({
        ...prev,
        [formInputs.labelId]: value,
      }));
      if (formInputs.labelId === "coupon") {
        sendRequest(`/api/payment/verifyCoupon/${value}`, "get").then((res) => {
          if (res.data.coupon.discount) {
            Toast.success(`Coupon code [${value}] applied successfully`);
          }
        });
      }
    };
  }

  return (
    <div className={className}>
      {parentFormsByName[parentFormStepMap[formStep]].map((formInputs) => {
        return (
          <InputComponent
            key={formInputs.labelId}
            inputProps={formInputs}
            value={formFieldValueMap[formInputs.labelId] || ""}
            onChange={formInputHandlerHOC(formInputs)}
          />
        );
      })}
    </div>
  );
};

export default FormComponent;
