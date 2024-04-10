import classNames from "classnames/bind";
import ReactDOM from "react-dom";
import loaderImg from "~/assets/images/giphy.gif";
import styles from "./Loader.module.scss";

const cx = classNames.bind(styles);
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={cx("wrapper")}>
      <div className={cx("loader")}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
