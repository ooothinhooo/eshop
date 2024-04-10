import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./ViewProducts.module.scss";

const cx = classNames.bind(styles);
const ItemProduct_Admin = ({
  id,
  index,
  name,
  Brand,
  price,
  imageURL,
  category,
  sum,
  func,
  className,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img src={imageURL} alt={name} style={{ width: "100px" }} />
      </td>
      <td>{name}</td>
      <td>{Brand}</td>
      <td>{category}</td>
      <td>{sum}</td>
      <td>{`${price}K`}</td>
      <td className={cx(className)}>
        <Link to={`/admin/add-product/${id}`}>
          <FaEdit size={20} color="green" />
          &nbsp;
          <FaTrashAlt size={18} color="red" onClick={func} />
        </Link>
      </td>
    </tr>
  );
};

// ItemProduct_Admin.propTypes = {
//   id: PropTypes.string,
//   index: PropTypes.number,
//   Brand: PropTypes.string,
//   name: PropTypes.string,
//   price: PropTypes.number,
//   imageURL: PropTypes.string,
//   category: PropTypes.string,
//   sum:PropTypes.string,
//   func: PropTypes.func,
//   className: PropTypes.string,
// };
export default ItemProduct_Admin;
