import React, { useState } from "react";
import "./installmentList.scss";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { useUser } from "../../redux/actions/userAction";

const InstallmentList: React.FC<InstallmentListProps> = ({
  allInstallment,
  userIntsallment,
  userFeePlan,
}) => {
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);

  const { createUserPayment } = useUser();

  const paidInstallments = allInstallment?.filter((installment) =>
    userIntsallment?.some(
      ({ installmentId }) => installmentId === installment?._id
    )
  );

  const unpaidInstallments = allInstallment?.filter(
    (installment) => !paidInstallments?.includes(installment)
  );

  const handlePayNow = async (installment: Installment) => {
    if (paymentReceipt) {

      try {
        const paymentReceiptUrl = await readFileAsDataURL(paymentReceipt);
        const input: UserPaymentInputType = {
          batch: userFeePlan?.batchCode,
          feePlan: userFeePlan?._id,
          imageUrl: String(paymentReceiptUrl),
          installmentId: installment._id ?? "",
        };
         const response = await createUserPayment(input)
         
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
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input"
                      onChange={(e) =>
                        setPaymentReceipt(e.target.files?.[0] ?? null)
                      }
                    />
                    <label className="file-input-label">
                      {paymentReceipt ? paymentReceipt.name : "Select Receipt"}
                    </label>
                  </div>
                  <button
                    className={`pay-now-button
                      ${!Boolean(paymentReceipt) ? "disabled" : "enabled"}
                      `}
                    onClick={() => handlePayNow(installment)}
                    disabled={!Boolean(paymentReceipt)}
                  >
                    {"Pay Now"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallmentList;
