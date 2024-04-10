import classNames from "classnames/bind";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Loader } from "~/components";
import { db } from "~/firebase/config";
import styles from "./ChangeOrderStatus.module.scss";

const cx = classNames.bind(styles);

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orederTime: order.orederTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createAt: order.createAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      // setDoc(doc(db, "orders", id), orderConfig);

     

      const docRef = doc(db, 'orders', id);
      updateDoc(docRef, {
        orderStatus: status,
    })
        .then(() => {
            // console.log('unliked');
        })
        .catch((e) => {
            console.log(e);
        });

 setIsLoading(false);
      toast.success("Order status changes successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      console.log(error)
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={cx("status")}>
        <Card cardClass={cx("card")}>
          <h4>Cập Nhật</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn Trạng Thái --
                </option>
                <option value="Đã Đặt Hàng...">Đã Đặt Hàng...</option>
                <option value="Đang Xữ Lý...">Đang Xữ Lý...</option>
                <option value="Đang Vận Chuyển...">Đang Vận Chuyển...</option>
                <option value="Đã Giao Hàng">Đã Giao Hàng</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Cập nhật trạng thái
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

ChangeOrderStatus.propTypes = {
  order: PropTypes.object,
  id: PropTypes.string,
};

export default ChangeOrderStatus;
