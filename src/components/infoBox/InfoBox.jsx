import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card } from "..";
import styles from "./InfoBox.module.scss";
const cx = classNames.bind(styles);

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={cx("info-box")}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};

InfoBox.propTypes = {
  cardClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,

  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.object,
};

export default InfoBox;
