import classNames from "classnames/bind";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminUser, auth } from "~/firebase/config";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectEmail } from "~/redux/slice/authSlice";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "~/redux/slice/cartSlice";
import ShowOnLogIn, { ShowOnLogOut } from "../hiddenLink/HiddenLink";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
const logo = (
  <div className={cx("logo")}>
    <Link to="/">
      <h2>
        e<span>Shop</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? cx("active") : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const fixNarBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixNarBar);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setName(uName);
        } else {
          setName(user.displayName);
          dispatch(REMOVE_ACTIVE_USER());
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : name,
            userId: user.uid,
          })
        );
      } else {
        setName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, name]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully...");
        // setName("");
        dispatch(REMOVE_ACTIVE_USER());
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const cart = (
    <span className={cx("cart")}>
      <Link to="/cart">
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );
  const userEmail = useSelector(selectEmail);
  const checkAdmin = adminUser.includes(userEmail)
  return (
    <header className={scrollPage ? `${cx("fixed")}` : null}>
      <div className={cx("header")}>
        {logo}

        <nav className={showMenu ? cx("show-nav") : cx("hide-nav")}>
          <div
            className={
              showMenu ? cx("nav-wrapper, show-nav-wrapper") : cx("nav-wrapper")
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={cx("logo-mobile")}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li className={cx("logo-mobile")}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Trang Chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className={activeLink}>
                Sản Phẩm
              </NavLink>
            </li>
          </ul>
          <div className={cx("header-right")} onClick={hideMenu}>
            <span className={cx("links")}>
              <ShowOnLogOut>
                <NavLink className={activeLink} to="/login">
                  Đăng nhập
                </NavLink>

                <NavLink className={activeLink} to="/register">
                 Đăng Ký
                </NavLink>
              </ShowOnLogOut>

              <ShowOnLogIn>
                <a href="#home" style={{ color: "#ff7722" }}>
                  &nbsp; {name}
                </a>
                {checkAdmin && <>
                  <NavLink className={activeLink} to="/admin/all-products">
                 Quản Lý
                </NavLink>
                </> }
            

                {/* <NavLink className={activeLink} to="/order-history">
                  My Orders
                </NavLink> */}

                <NavLink to="/" onClick={logoutUser}>
                  Đăng Xuất
                </NavLink>
              </ShowOnLogIn>
            </span>
            {cart}
          </div>
        </nav>
        <div className={cx("menu-icon")}>
          {cart}

          <HiOutlineMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
