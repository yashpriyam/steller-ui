import React, { useEffect, useState } from "react";
import "./AllUserPaymentsList.scss";
import UserPaymentCard from "../../../components/userPaymentsCard/userPaymentCard";
import { useAllUsersPayments } from "../../../redux/actions/getAllUsersPayments";
import { useTranslation } from "react-i18next";
import { useAdmin } from "../../../redux/actions/admin";
import { readFileAsDataURL } from "../../../utils/readFileAsDataURL";

const AllUserPaymentsList: React.FC = () => {
  const { t } = useTranslation();
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const { allUsersPayments, getAllUsersPayments } = useAllUsersPayments();
  

  const { updateUserPayment, isLoading } = useAdmin();
  useEffect(() => {
    getAllUsersPayments({
      isApproved: false,
      isPending: false,
      isRejected: false,
    });
  }, [isLoading]);

  const handleApprove = async (paymentId: string) => {
    if (paymentReceipt) {
      const paymentReceiptUrl = await readFileAsDataURL(paymentReceipt);

      const inputData = {
        paymentId,
        isApproved: true,
        image: paymentReceiptUrl,
      };
      updateUserPayment("approved", inputData);
    }
  };

  const handleReject = (paymentId: string) => {
    const inputData = {
        paymentId,
        isRejected: true
      };
      updateUserPayment("rejected", inputData);
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
            paymentReceipt={paymentReceipt}
            setPaymentReceipt={setPaymentReceipt}
          />
        ))}
      </ul>
    </div>
  );
};

export default AllUserPaymentsList;
