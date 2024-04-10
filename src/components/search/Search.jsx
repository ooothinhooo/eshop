import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import PropTypes from "prop-types";
import { BiSearch } from "react-icons/bi";

const cx = classNames.bind(styles);
const Search = ({ value, onChange }) => {
  return (
    <div className={cx("search")}>
      <BiSearch size={18} className={cx("icon")} />

      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
