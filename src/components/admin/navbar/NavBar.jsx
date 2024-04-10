import classNames from "classnames/bind";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "~/redux/slice/authSlice";
import styles from "./NavBar.module.scss";

const cx = classNames.bind(styles);
const activeLink = ({ isActive }) => (isActive ? `${cx("active")}` : "");
const NavBar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className={cx("navbar")}>
      <div className={cx("user")}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          {/* <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
