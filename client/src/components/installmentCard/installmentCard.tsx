import React from 'react';
import './InstallmentCard.scss'; // Import the SCSS file

interface InstallmentCardProps {
  installment: Installment;
  index?: number
}

const InstallmentCard: React.FC<InstallmentCardProps> = ({ installment, index=0 }) => {
  return (
    <div className="installment-card">
      <h4>Installment {index + 1}</h4>
      <p>Amount: {installment.amount}</p>
      <p>Sequence: {installment.sequence}</p>
      <p>Due Date: {installment.dueDate?.toString()}</p>
      
    </div>
  );
};

export default InstallmentCard;