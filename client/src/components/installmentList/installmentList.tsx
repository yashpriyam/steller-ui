import React from 'react';
import './installmentList.scss';

const InstallmentList: React.FC<InstallmentListProps> = ({
  allInstallment,
  userIntsallment,
}) => {
  const paidInstallments = allInstallment?.filter((installment) =>
    userIntsallment?.some(({ installmentId }) => installmentId === installment?._id)
  );

  const unpaidInstallments = allInstallment?.filter(
    (installment) => !paidInstallments?.includes(installment)
  );

  return (
    <div>
      {Boolean(paidInstallments?.length) && (
        <div className="paid-installments">
          <h2 className="installment-heading">Paid Installments</h2>
          <div className="installment-cards">
            <ul>
              {paidInstallments?.map((installment) => (
                <li key={installment.id} className="installment-item">
                  <p className="installment-info">
                    Amount: {installment.amount}, Sequence: {installment.sequence}, Due Date: {installment?.dueDate?.toString()}
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
            <ul>
              {unpaidInstallments?.map((installment) => (
                <li key={installment.id} className="installment-item">
                  <p className="installment-info">
                    Amount: {installment.amount}, Sequence: {installment.sequence}, Due Date: {installment.dueDate?.toString()}
                  </p>
                  <button className="pay-now-button" onClick={() => { /* handlePayNow(installment) */ }}>
                    Pay Now
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
