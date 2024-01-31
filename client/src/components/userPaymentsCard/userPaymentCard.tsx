import React, { useState } from "react";
import "./userPaymentCard.scss";
import { Button } from "../../components/button/button";
import { useTranslation } from "react-i18next";

const UserPaymentCard: React.FC<UserPaymentCardProps> = ({
  payment,
  onApprove,
  onReject,
  paymentReceipt,
  setPaymentReceipt,
  isLoading
}) => {
  const { _id = "", isApproved, isRejected, isPending, image, user } = payment;
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { t } = useTranslation();

  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImagePreviewOpen(true);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    setIsImagePreviewOpen(false);
  };

  const getStatusClassName = (payment: UserPaymentSchemaType) => {
    if (payment.isApproved) {
      return "approved";
    } else if (payment.isRejected) {
      return "rejected";
    } else {
      return "pending";
    }
  };

  return (
    <div className={`user-payment-card ${getStatusClassName(payment)}`}>
      {getStatusClassName(payment) && (
        <div className={`status-tag ${getStatusClassName(payment)}`}>
          {getStatusClassName(payment).toUpperCase()}
        </div>
      )}
      <p className="payment-card-text">
        {t("Payment ID:")} {_id}
      </p>
      <p className="payment-card-text">
        {"User Name:"} {user.name}
      </p>
      <p className="payment-card-text">
        {t("User Email: ")}
        {user.email}
      </p>
      <img
        src={image.secureUrl}
        alt="Fee Slip"
        className="fee-slip-image"
        onClick={() => openImagePreview(image.secureUrl)}
      />
      {!isApproved && (
        <>
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
          <div className="action-buttons">
            <Button
              className="approve-button"
              onClick={() => onApprove(_id)}
              text={t("Approve")}
              isDisabled={!paymentReceipt}
              isLoading={isLoading}
              key={payment._id}
            />

            <Button
              className="reject-button"
              onClick={() => onReject(_id)}
              text={t("Reject")}
              isLoading={isLoading}
              key={payment._id}
            />
          </div>
        </>
      )}
      {isImagePreviewOpen && (
        <div className="image-preview-modal" onClick={closeImagePreview}>
          <img
            className="preview-image"
            src={selectedImage || ""}
            alt="Image Preview"
          />
        </div>
      )}
    </div>
  );
};

export default UserPaymentCard;
