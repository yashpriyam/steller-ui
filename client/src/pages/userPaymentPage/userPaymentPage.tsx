import React, { useEffect, useState } from "react";
import PaymentCard from "../../components/paymentCard/paymentCard";
import { useUserPayments } from "../../redux/actions/getUserPayments";
import { useFeePlans } from "../../redux/actions/feePlanActions";
import "./UserPaymentPage.scss";
import { useUser } from "../../redux/actions/userAction";
import InstallmentList from "../../components/installmentList/installmentList";
import { Button } from "../../components/button/button";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/spinner/spinner";
import NoDataFound from "../../components/noDataFound/noDataFound";

const UserPaymentPage: React.FC = () => {
  const [selectedFeePlan, setSelectedFeePlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusPaymentCard, setFocusPaymentCard] = useState<string>();

  const { userPayments, getUserPayments, isLoading: isPaymentsLoading } = useUserPayments();
  const { feePlans, getFeePlans, isLoading: isFeePlanLoading } = useFeePlans();
  const {
    updateUserInfo,
    getUserData,
    user,
    isLoading: isUserUpdating,
  } = useUser();
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

  
  if (isFeePlanLoading && isPaymentsLoading) {
     return( <Spinner/>)
  }

  return (
    <>
      {Boolean(feePlans?.length || userPayments?.userPayments?.length) ? (
        <div className="user-payment-page">
          <h1 className="user-payment-page-header">{t('User Payment Page')}</h1>
          {!Boolean(user?.userData?.feePlan) ? (
            <div className="fee-plan-card">
              {Boolean(feePlans?.length) &&
                feePlans?.map((feePlan, idx) => (
                  <div key={`${feePlan.name}-${idx}}`} className="fee-plan-card-input-wrapper">
                    <input
                      type="radio"
                      id={`${feePlan.name}-${idx}}`}
                      name="feePlanRadio"
                      value={feePlan.name}
                      style={{display:"none"}}
                      checked={selectedFeePlan === feePlan._id}
                      onChange={() => {
                          setSelectedFeePlan(feePlan._id ?? "")
                          setFocusPaymentCard(`${feePlan.name}-${idx}}`);
                        }
                      }
                    />
                    <label htmlFor={`${feePlan.name}-${idx}}`} className={`${focusPaymentCard=== `${feePlan.name}-${idx}}` && "payment-card-label-focus"}`}>
                      <PaymentCard feePlan={feePlan} />
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
            <div className="fee-plan-installment-list-container">
              <InstallmentList
                allInstallment={userFeePlan?.installments ?? []}
                userIntsallment={userPayments?.userPayments ?? []}
                userFeePlan={userFeePlan}
                setIsLoading={setIsLoading}
              />
            </div>
          )}
        </div>
      ) : (
      
        <NoDataFound message="No payment found" />
      )}
    </>
  );
};

export default UserPaymentPage;
