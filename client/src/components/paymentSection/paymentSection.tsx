import React from 'react';



// this types will changes when we get the actuall data 
interface PaymentSectionProps {
  feePlanData: any;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ feePlanData }) => {
  const { feePlanData: paymentDetails, response } = feePlanData;

  
  if (response.status !== 200 || !paymentDetails) {
    // Handle error state
    return (
      <div>
        <p>Error fetching payment details.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Batch Code: {paymentDetails?.batchCode}</p>
      <p>Name: {paymentDetails?.name}</p>
      <p>Description: {paymentDetails?.description}</p>

      {paymentDetails?.installments && (
        <div>
          <h3>Installments</h3>
          <ul>
            {paymentDetails?.installments?.map((installment: any) => (  
              <li key={installment.id}>
                Amount: {installment?.amount}, Sequence: {installment?.sequence}, Due Date: {installment?.dueDate.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {paymentDetails.miscellaneous && (
        <div>
          <h3>Miscellaneous</h3>
          <p>{/* Render miscellaneous details */}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
