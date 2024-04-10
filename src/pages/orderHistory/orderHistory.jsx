import { useFetchCollection } from "~/Hooks";
import styles from "./orderHistory.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDER, selectOrderHistory } from "~/redux/slice/orderSlice";
import { selectUserId } from "~/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "~/components";

const cx = classNames.bind(styles);

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDER(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrder = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${cx("order")}`}>
        <h2>Your order history</h2>
        <p>
          Open an order to leave a <b> Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={cx("table")}>
            {filteredOrder.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrder.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick()}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"} {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${cx("pending")}`
                                : `${cx("delivered")}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
