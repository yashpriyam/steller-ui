import React, { useEffect, useState } from "react";
import PaymentCard from "../../components/paymentCard/paymentCard";
import { useUserPayments } from "../../redux/actions/getUserPayments";
import { useFeePlans } from "../../redux/actions/feePlanActions";
import "./UserPaymentPage.scss";
import { useUser } from "../../redux/actions/userAction";
import InstallmentList from "../../components/installmentList/installmentList";

const UserPaymentPage: React.FC = () => {
  const [selectedFeePlan, setSelectedFeePlan] = useState<string | null>(null);

  const { userPayments, getUserPayments } = useUserPayments();
  const { feePlans, getFeePlans } = useFeePlans();
  const { updateUserInfo, getUserData, user } = useUser();

  const getData = async () => {
    await getUserData();
    await getUserPayments("");
    await getFeePlans(user?.userData?.batchCode ?? "");
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div className="user-payment-page">
      <h1>User Payment Page</h1>
      {!Boolean(user?.userData?.feePlan) ? (
        <div>
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
                  <PaymentCard feePlan={feePlan} />
                </label>
              </div>
            ))}
          {Boolean(feePlans?.length) && (
            <div className="button-wrapper">
              <button
                className="button"
                onClick={async () => {
                  selectedFeePlan &&
                    updateUserInfo({ feePlan: selectedFeePlan });
                }}
                disabled={!Boolean(selectedFeePlan) ?? true}
              >
                Add Payment Plan
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>

            <InstallmentList allInstallment={feePlans?.[0]?.installments ?? []} userIntsallment={userPayments?.userPayments ?? []}/>
        </div>
      )}
    </div>
  );
};

export default UserPaymentPage;
