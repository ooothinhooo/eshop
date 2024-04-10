import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "~/redux/slice/authSlice";
import PropTypes from "prop-types";
const ShowOnLogIn = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }

  return null;
};
export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }

  return null;
};
ShowOnLogIn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default ShowOnLogIn;
