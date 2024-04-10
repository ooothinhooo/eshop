import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckOutForm from "~/components/checkOutForm/CheckOutForm";
import { selectEmail } from "~/redux/slice/authSlice";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "~/redux/slice/cartSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "~/redux/slice/checkoutSlice";

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PRIVATE_KEY
);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("xx");
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);

  const billingAddress = useSelector(selectBillingAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `Shop payment: Email: ${customEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
