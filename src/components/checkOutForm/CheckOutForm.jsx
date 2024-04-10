import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import classNames from "classnames/bind";
import spinnerImg from "~/assets/images/Spinner-1s-200px.gif";
import { Card } from "..";
import styles from "./CheckOutForm.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEmail, selectUserId } from "~/redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "~/redux/slice/cartSlice";
import { selectShippingAddress } from "~/redux/slice/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "~/firebase/config";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const CheckOutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
  }, []);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleDateString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section>
      <div className={`container ${cx("checkout")}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={cx("card")}>{/* */}</Card>
          </div>
          <div>
            <Card cardClass={cx("card", "pay")}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={cx("payment-element")} />
              <button
                disabled={isLoading || !stripe || elements}
                id="submit"
                className={cx("button")}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>

              {message && <div id={cx("payment-message")}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckOutForm;
