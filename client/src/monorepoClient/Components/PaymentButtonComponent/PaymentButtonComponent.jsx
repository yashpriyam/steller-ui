import { ButtonComponent } from "../Button/Button";
import Toast from "../../helpers/utils/toast";
import useHttp from "../../CustomHooks/useHttp";

const __DEV__ = process.env.NODE_ENV !== "production";

const PaymentButtonComponent = ({
  user,
  paymentStatus,
  setPaymentStatus,
  coupon,
}) => {
  const { sendRequest } = useHttp();
  async function displayRzp(coupon) {
    const orderData = await sendRequest("/api/payment/rzp", "post", { coupon })
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        if (coupon && err) {
          Toast.error(err.response.data.message);
        }
      });

    const options = {
      key: __DEV__
        ? process.env.RAZORPAY_PAYMENT_TEST_KEY_ID
        : process.env.PAYMENT_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "WebMasters",
      description: "Registration Fee for WebMaster",
      image: "/logo.svg",
      order_id: orderData.id,
      handler: async function (response) {
        const orderData = await sendRequest(
          "/api/payment/transaction/" + response.razorpay_order_id,
          "get"
        );

        orderData.data &&
          orderData.data.transaction &&
          setPaymentStatus(orderData.data.transaction);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phonenumber,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      {paymentStatus && paymentStatus.status === 1 ? (
        <h3>
          Payment of INR {paymentStatus.amount / 100} on{" "}
          {new Date(paymentStatus.updatedAt).toLocaleString()} has beed
          successfully completed!
        </h3>
      ) : (
        <div className="makePayment">
          <ButtonComponent
            className="makePaymentBtn"
            onClick={() => displayRzp(coupon)}
            disabled={paymentStatus}
          >
            Make Payment
          </ButtonComponent>
        </div>
      )}
    </>
  );
};
export default PaymentButtonComponent;
