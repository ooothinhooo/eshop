import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "~/redux/slice/checkoutSlice";
import styles from "./Checkout.module.scss";
import CheckoutSummary from "~/components/checkoutSummary/CheckOutSummary";
import { Card } from "~/components";
import { CountryDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from "~/redux/slice/cartSlice";
import { db, updateProduct } from "~/firebase/config";
import { selectEmail, selectUserId } from "~/redux/slice/authSlice";

const initialAddressState = {
  name: "",
  line1: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const userID = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  // const shippingAddress = useSelector(selectShippingAddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveOrder()
    // dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    // dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    // navigate("/checkout");
  };


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
      orderStatus: "Đã Đặt Hàng",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      const x = cartItems?.map((item)=>{
        // console.log((parseInt(item?.total) - parseInt(item?.quantity        )))
        updateProduct(item?.id, (parseInt(item?.sum) - parseInt(item?.cartQuantity)))
      })
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/");
    } catch (error) {
      // toast.error(error.message);
      console.log(error)
    }
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
               <button type="submit" className="--btn --btn-primary">
                Proceed To Checkout
              </button>
            </Card>
            {/* BILLING ADDRESS */}
           
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
