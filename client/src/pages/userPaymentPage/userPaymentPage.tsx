import React, { useEffect, useState } from "react";
import PaymentCard from "../../components/paymentCard/paymentCard";
import { useUserPayments } from "../../redux/actions/getUserPayments";
import { useFeePlans } from "../../redux/actions/feePlanActions";
import "./UserPaymentPage.scss";
import { useUser } from "../../redux/actions/userAction";
import InstallmentList from "../../components/installmentList/installmentList";
import { Button } from "../../components/button/button";
import { useTranslation } from "react-i18next";

const UserPaymentPage: React.FC = () => {
  const [selectedFeePlan, setSelectedFeePlan] = useState<string | null>(null);
  const [isLoading , setIsLoading] = useState(false)

  const { userPayments, getUserPayments } = useUserPayments();
  const { feePlans, getFeePlans  } = useFeePlans();
  const { updateUserInfo, getUserData, user, isLoading: isUserUpdating } = useUser();
  const { t } = useTranslation();

  const getData = async () => {
    await getUserPayments("");
    await getFeePlans(user?.userData?.batchCode ?? "");
  };


  useEffect(() => {
    getData();
  }, [user, isUserUpdating, isLoading]);

  const userFeePlan = feePlans?.filter(
    (fee) => fee._id === user?.userData?.feePlan
  )[0];

  return (
    <div className="user-payment-page">
      <h1>User Payment Page</h1>
      {!Boolean(user?.userData?.feePlan)  ? (
        <div className="fee-plan-card">
          {Boolean(feePlans?.length) &&
            feePlans?.map((feePlan) => (
              <div key={feePlan.name}>
                <input
                  type="radio"
                  id={feePlan.name}
                  name="feePlanRadio"
                  value={feePlan.name}
                  checked={selectedFeePlan === feePlan._id}
                  onChange={() => setSelectedFeePlan(feePlan._id ?? "")}
                />
                <label htmlFor={feePlan.name}>
                  <PaymentCard feePlan={feePlan}/>
                </label>
              </div>
            ))}
          {Boolean(feePlans?.length) && (
            <div className="button-wrapper">
                <Button
          className="button"
           text={t("add_payment_plan")}
            isDisabled={!Boolean(selectedFeePlan) ?? true}
            onClick={async () => {
              selectedFeePlan &&
                updateUserInfo({ feePlan: selectedFeePlan });
            }}
           isLoading={isUserUpdating}
      />
            </div>
          )}
        </div>
      ) : (
        <div>
          <InstallmentList
            allInstallment={userFeePlan?.installments ?? []}
            userIntsallment={userPayments?.userPayments ?? []}
            userFeePlan={userFeePlan}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default UserPaymentPage;
