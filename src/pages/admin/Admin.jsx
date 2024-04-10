import { Route, Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import classNames from "classnames/bind";
import {
  AddProduct,
  Home,
  NavBar,
  Orders,
  OrderDetails,
  ViewProducts,
} from "~/components/admin";

const cx = classNames.bind(styles);

const Admin = () => {
  return (
    <div className={cx("admin")}>
      <div className={cx("navbar")}>
        <NavBar />
      </div>
      <div className={cx("content")}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
