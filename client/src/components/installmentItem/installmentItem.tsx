import { useTranslation } from "react-i18next";
import { Button } from "../../components/button/button";
import React, { useState } from "react";

const InstallmentItem: React.FC<InstallmentItemProps> = ({
  installment,
  handlePayNow,
  isLoading
}) => {
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const { t } = useTranslation();
  return (
    <li className="installment-item">
      <p className="installment-info">
        <span className="installment-elem">Amount: {installment.amount}</span>
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
          onChange={(e) => setPaymentReceipt(e.target.files?.[0] ?? null)}
        />
        <label className="file-input-label">
          {paymentReceipt ? paymentReceipt.name : "Select Receipt"}
        </label>
      </div>
      <Button
          className={`pay-now-button ${!paymentReceipt ? "disabled" : "enabled"}`}
           text={t("Pay Now")}
            isDisabled={!paymentReceipt}
            onClick={() => {
            handlePayNow(installment, paymentReceipt)
            setPaymentReceipt(null)}}
            isLoading={isLoading} 
            key={installment._id}
      />
    </li>
  );
};

export default InstallmentItem;
