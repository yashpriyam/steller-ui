import React, { useState } from "react";
import "./installmentList.scss";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { useUser } from "../../redux/actions/userAction";
import InstallmentItem from "../../components/installmentItem/installmentItem";

const InstallmentList: React.FC<InstallmentListProps> = ({
  allInstallment,
  userIntsallment,
  userFeePlan,
  setIsLoading,
  isLoading
}) => {
  const { createUserPayment } = useUser();

  const paidInstallments = allInstallment?.filter((installment) =>
    userIntsallment?.some(
      ({ installmentId }) => installmentId === installment?._id
    )
  );

  const unpaidInstallments = allInstallment?.filter(
    (installment) => !paidInstallments?.includes(installment)
  );

  const handlePayNow = async (
    installment: Installment,
    paymentReceipt: File | null
  ) => {
    if (paymentReceipt !== null) {
      try {
        const paymentReceiptUrl = await readFileAsDataURL(paymentReceipt);
        const input: UserPaymentInputType = {
          batch: userFeePlan?.batchCode,
          feePlan: userFeePlan?._id,
          imageUrl: String(paymentReceiptUrl),
          installmentId: installment._id ?? "",
        };
        const response = await createUserPayment(input);
        if (response?.data && setIsLoading) {
          setIsLoading(!isLoading)
        }
      } catch (error) {
        console.error("Error submitting payment receipt", error);
      }
    } else {
      console.log("Please select a payment receipt");
    }
  };

  return (
    <div>
      {Boolean(paidInstallments?.length) && (
        <div className="paid-installments">
          <h2 className="installment-heading">Paid Installments</h2>
          <div className="installment-cards">
            <ul className="installment-item-constainer">
              {paidInstallments?.map((installment) => (
                <li key={installment.id} className="installment-item">
                  <p className="installment-info">
                    <span className="installment-elem">
                      Amount: {installment.amount}
                    </span>
                    <span className="installment-elem">
                      Sequence: {installment.sequence}
                    </span>
                    <span className="installment-elem">
                      Due Date: {installment.dueDate?.toString()}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {Boolean(unpaidInstallments?.length) && (
        <div className="unpaid-installments">
          <h2 className="installment-heading">Unpaid Installments</h2>
          <div className="installment-cards">
            <ul className="installment-item-constainer">
              {unpaidInstallments?.map((installment) => (
                <InstallmentItem
                  key={installment.id}
                  installment={installment}
                  handlePayNow={handlePayNow}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallmentList;
