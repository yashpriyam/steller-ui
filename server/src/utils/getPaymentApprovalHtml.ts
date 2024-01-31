
export const generatePaymentApprovalEmail = ({
    status,
    date,
    receiptImageUrl,
    userEmail,
    rejectReason,
  }: PaymentApprovalEmailData): string => {
    return `
      <div>
        <h2>Payment ${status} Notification</h2>
        <br />
        <div>
          Your Payment has been <strong>${status}</strong>.
        </div>
        <div>
          Date: <strong>${date}</strong>
        </div>
        <br />
        ${Boolean(receiptImageUrl) && `<div><img src="${receiptImageUrl}" alt="Receipt" style="max-width: 100%; height: auto;" /></div>`}
        ${Boolean(rejectReason) && `<div>Reject Reason: <strong>${rejectReason}</strong></div>`}
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