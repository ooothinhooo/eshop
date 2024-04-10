import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const Card = ({ children, cardClass }) => {
  return <div className={`${cx("card")} ${cx(cardClass)}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  cardClass: PropTypes.string,
};
export default Card;
