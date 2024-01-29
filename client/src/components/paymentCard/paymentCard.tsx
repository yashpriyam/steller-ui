import React from "react";
import "./PaymentCard.scss";
import InstallmentCard from "../../components/installmentCard/installmentCard";

interface PaymentCardProps {
  feePlan: FeePlanSchemaType;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ feePlan }) => {
  const totalAmount = feePlan?.installments?.reduce((sum, installment) => {
    const amount = parseFloat(installment?.amount!) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="payment-card">
      <h3>User Payment</h3>
      <p className="info">BATCH CODE: {feePlan.batchCode}</p>
      <p className="info">NAME: {feePlan.name}</p>
      <p className="info">DESCRIPTION: {feePlan.description}</p>
      <p className="info">TOTAL FEE AMOUNT: {totalAmount && totalAmount}</p>
      {feePlan.installments?.map((installment, id) => (
        <InstallmentCard
          key={installment.id}
          installment={installment}
          index={id}
        />
      ))}
    </div>
  );
};

export default PaymentCard;