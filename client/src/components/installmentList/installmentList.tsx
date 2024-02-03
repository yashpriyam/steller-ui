import React, { useState } from "react";
import "./installmentList.scss";
import { readFileAsDataURL } from "../../utils/readFileAsDataURL";
import { useUser } from "../../redux/actions/userAction";
import InstallmentItem from "../../components/installmentItem/installmentItem";

const InstallmentList: React.FC<InstallmentListProps> = ({
  allInstallment,
  userIntsallment,
  userFeePlan,
  setIsLoading,
  isLoading,
}) => {
  const { createUserPayment } = useUser();
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImagePreviewOpen(true);
  };
  const closeImagePreview = () => {
    setSelectedImage(null);
    setIsImagePreviewOpen(false);
  };
  const paidInstallments = allInstallment
    ?.filter((installment) =>
      userIntsallment?.some(
        ({ installmentId, isRejected }) => installmentId === installment?._id && !isRejected
      )
    )
    ?.map((installment) => {
      const matchingUserInstallment = userIntsallment?.find(
        ({ installmentId }) => installmentId === installment?._id
      );
      return {
        ...installment,
        isApproved: matchingUserInstallment?.isApproved,
        isRejected: matchingUserInstallment?.isRejected,
        isPending: matchingUserInstallment?.isPending,
        image: matchingUserInstallment?.image,
      };
    });

  const unpaidInstallments = allInstallment?.filter(
    (installment) =>
      !paidInstallments?.some(
        (paidInstallment) => paidInstallment?._id === installment?._id
      )
  );

  const handlePayNow = async (
    installment: Installment,
    paymentReceipt: File | null
  ) => {
    if (paymentReceipt !== null) {
      try {
        setIsLoading && setIsLoading(true);
        const paymentReceiptUrl = await readFileAsDataURL(paymentReceipt);
        const input: UserPaymentInputType = {
          batch: userFeePlan?.batchCode,
          feePlan: userFeePlan?._id,
          imageUrl: String(paymentReceiptUrl),
          installmentId: installment._id ?? "",
        };
        const response = await createUserPayment(input);
        if (response?.data && setIsLoading) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error submitting payment receipt", error);
      }
    } else {
      console.log("Please select a payment receipt");
    }
  };

  const getStatusClassName = (installment: any) => {
    if (installment.isApproved) {
      return "approved";
    } else if (installment.isRejected) {
      return "rejected";
    } else {
      return "pending";
    }
  };

  return (
    <div className="installment-list-container">
      {Boolean(paidInstallments?.length) && (
        <div className="paid-installments">
          <h2 className="installment-heading">Paid Installments</h2>
          <div className="installment-cards">
            <ul className="installment-item-container">
              {paidInstallments?.map((installment) => (
               <> <li key={installment.id} className={`installment-item`}>
                  <p className="installment-info">
                    <span className="installment-elem">
                      Amount: {installment.amount}
                    </span>
                    <span className="installment-elem">
                      Sequence: {installment.sequence}
                    </span>
                    <span className="installment-elem">
                      Due Date: {installment?.dueDate?.toString()}
                    </span>
                    <span
                      className={`installment-status installment-elem ${getStatusClassName(
                        installment
                      )}`}
                    >
                      Status: {getStatusClassName(installment).toUpperCase()}
                    </span>
                  </p>
                  <img
                    src={installment?.image?.secureUrl}
                    alt="fee plan"
                    className={`installment-image ${getStatusClassName(
                      installment
                    )}`}
                    onClick={() => openImagePreview(installment?.image?.secureUrl)}
                  />
                   {isImagePreviewOpen && (
                      <div className="image-preview-modal" onClick={closeImagePreview}>
                        <img
                          className="preview-image"
                          src={selectedImage|| ""}
                          alt="Image Preview"
                        />
                      </div>
                      )}
                </li>
                <li key={installment.id} className={`installment-item`}>
                <p className="installment-info">
                  <span className="installment-elem">
                    Amount: {installment.amount}
                  </span>
                  <span className="installment-elem">
                    Sequence: {installment.sequence}
                  </span>
                  <span className="installment-elem">
                    Due Date: {installment?.dueDate?.toString()}
                  </span>
                  <span
                    className={`installment-status installment-elem ${getStatusClassName(
                      installment
                    )}`}
                  >
                    Status: {getStatusClassName(installment).toUpperCase()}
                  </span>
                </p>
                <img
                  src={installment?.image?.secureUrl}
                  alt="fee plan"
                  className={`installment-image ${getStatusClassName(
                    installment
                  )}`}
                  onClick={() => openImagePreview(installment?.image?.secureUrl)}
                />
                 {isImagePreviewOpen && (
                    <div className="image-preview-modal" onClick={closeImagePreview}>
                      <img
                        className="preview-image"
                        src={selectedImage|| ""}
                        alt="Image Preview"
                      />
                    </div>
                    )}
              </li></>
              ))}
            </ul>
          </div>
        </div>
      )}

      {Boolean(unpaidInstallments?.length) && (
        <div className="unpaid-installments">
          <h2 className="installment-heading">Unpaid Installments</h2>
          <div className="installment-cards">
            <ul className="installment-item-container">
              {unpaidInstallments?.map((installment) => (
               <> <InstallmentItem
                  key={installment.id}
                  installment={installment}
                  handlePayNow={handlePayNow}
                  isLoading={isLoading}
                />
                 <InstallmentItem
                  key={installment.id}
                  installment={installment}
                  handlePayNow={handlePayNow}
                  isLoading={isLoading}
                />
                 <InstallmentItem
                  key={installment.id}
                  installment={installment}
                  handlePayNow={handlePayNow}
                  isLoading={isLoading}
                />
                 <InstallmentItem
                  key={installment.id}
                  installment={installment}
                  handlePayNow={handlePayNow}
                  isLoading={isLoading}
                />
                </>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallmentList;
