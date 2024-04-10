import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
const cx = classNames.bind(styles);
const NotFound = () => {
  return (
    <div className={cx("not-found")}>
      <div>
        <h2>404</h2>
        <p>Opppppppssss, page not found</p>
        <button className="--btn">
          <Link to="/">&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
