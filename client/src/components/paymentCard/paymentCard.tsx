import React from 'react';
import './PaymentCard.scss';
import InstallmentCard from '../../components/installmentCard/installmentCard';

interface PaymentCardProps {
  feePlan: FeePlanSchemaType; 
}

const PaymentCard: React.FC<PaymentCardProps> = ({ feePlan }) => {
  
  return (
    <div className="payment-card"> 
    <h3>User Payment</h3>
    <p>BATCH CODE: {feePlan.batchCode}</p>
    <p>NAME: {feePlan.name}</p>
    <p>DESCRIPTION: {feePlan.description}</p>
    {feePlan.installments?.map((installment, id) => (
        <InstallmentCard key={installment.id} installment={installment} index={id} />
      ))}
  </div>
  );
};

export default PaymentCard;