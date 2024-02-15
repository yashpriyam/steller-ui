import { useTranslation } from "react-i18next";
import { Button } from "../../components/button/button";
import React, { useState } from "react";

const InstallmentItem: React.FC<InstallmentItemProps> = ({
  installment,
  handlePayNow,
}) => {
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await handlePayNow(installment, paymentReceipt);
    setPaymentReceipt(null);
    setIsLoading(false);
  };

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
      <div className="file-input-button-wrapper">
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
          className={`pay-now-button ${
            !paymentReceipt ? "disabled" : "enabled"
          }`}
          text={t("pay_now")}
          isDisabled={!paymentReceipt}
          onClick={handleOnClick}
          isLoading={isLoading}
          key={installment._id}
        />
      </div>
    </li>
  );
};

export default InstallmentItem;
