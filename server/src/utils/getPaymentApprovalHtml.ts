
   export const generatePaymentApprovalEmail = ({
    status,
    date,
    receiptImageUrl,
    userEmail,
  }: PaymentApprovalEmailData): string => {
    return `
      <div>
        <h2>Payment Approval Notification</h2>
        <br />
        <div>
          Your Payment has been <strong>${status}</strong>.
        </div>
        <div>
          Date: <strong>${date}</strong>
        </div>
        <br />
        <div>
          <img src="${receiptImageUrl}" alt="Receipt" style="max-width: 100%; height: auto;" />
        </div>
        <br />
        <div>
          If you have any questions or concerns, please contact our support team.
        </div>
        <br />
        <br />
        Best regards,
        <br />
        The Webmaster Team
      </div>
    `;
  };
  
  