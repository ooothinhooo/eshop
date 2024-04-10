import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import spinnerImg from "~/assets/images/Spinner-1s-200px.gif";

import ChangeOrderStatus from "./../changeOrderStatus/ChangeOrderStatus";
import styles from "./OrderDetails.module.scss";
import { useEffect, useState } from "react";
import { useFetchDocument } from "~/Hooks";

const cx = classNames.bind(styles);

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);
  console.log("Document", document);
  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={cx("table")}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> ${order.orderAmount}
            </p>
            <p>
              <b>Order Status</b> {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address</b>
              <br />
              Address: {order.shippingAddress.line1},
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              State: {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  id: PropTypes.string,
};
export default OrderDetails;
