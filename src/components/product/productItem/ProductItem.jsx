import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "~/components";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "~/redux/slice/cartSlice";
import styles from "./ProductItem.module.scss";

const cx = classnames.bind(styles);

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${cx("grid")}` : `${cx("list")}`}>
      <Link to={`/product-details/${id}`}>
        <div className={cx("img")}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={cx("content")}>
        <div className={cx("details")}>
          <p>{`${price}K`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={cx("desc")}>{shortenText(desc, 200)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => addToCart(product)}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </Card>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
  grid: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  desc: PropTypes.string,
  imageURL: PropTypes.string,
};

export default ProductItem;
