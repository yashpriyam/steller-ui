import React, { useEffect } from "react";
import "./AllUserPaymentsList.scss";
import UserPaymentCard from "../../../components/userPaymentsCard/userPaymentCard";
import { useAllUsersPayments } from "../../../redux/actions/getAllUsersPayments";
import { useTranslation } from "react-i18next";

const AllUserPaymentsList: React.FC = () => {
  const { t } = useTranslation();

  const { allUsersPayments, getAllUsersPayments } = useAllUsersPayments();
  useEffect(() => {
    getAllUsersPayments({
      isApproved: false,
      isPending: false,
      isRejected: false,
    });
  }, []);

  const handleApprove = (paymentId: string) => {
    // Implement logic for approving payment
    console.log(`Payment ${paymentId} approved`);
  };

  const handleReject = (paymentId: string) => {
    // Implement logic for rejecting payment
    console.log(`Payment ${paymentId} rejected`);
  };

  return (
    <div className="user-payments-list">
      <h2 className="list-title">{t("User Payments List")}</h2>
      <ul className="payment-list">
        {allUsersPayments?.allUsersPayments?.map((payment) => (
          <UserPaymentCard
            key={payment._id}
            payment={payment}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </ul>
    </div>
  );
};

export default AllUserPaymentsList;
