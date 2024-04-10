import classNames from "classnames/bind";
import { useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCollection } from "~/Hooks";
import { Chart, InfoBox } from "~/components";
import {
  CALC_TOTAL_ORDERS_AMOUNT,
  STORE_ORDER,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "~/redux/slice/orderSlice";
import { STORE_PRODUCTS, selectProducts } from "~/redux/slice/productSlice";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const orderIcon = <FaCartArrowDown size={30} color="orangered" />;
const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");
  console.log("data in collection orders", data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDER(data));

    dispatch(CALC_TOTAL_ORDERS_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className={cx("home")}>
      <h2 className={cx("admin")}>Admin home page</h2>
      <div className={cx("info-box")}>
        <InfoBox
          cardClass={`${cx("card", "card1")}`}
          title={"Earnings"}
          count={`${totalOrderAmount}K`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${cx("card", "card2")}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${cx("card", "card3")}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
