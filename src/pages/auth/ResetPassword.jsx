import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import ResetPassImg from "~/assets/images/reset.jpg";
import { Card, Loader } from "~/components";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/firebase/config";
import { toast } from "react-toastify";
import httpRequest from "~/utils/httpRequest";
const cx = classNames.bind(styles);
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await httpRequest
        .post("/auth/resetPassword", {
          email,
        })
        .then(() => {
          toast.success("Check you email for a reset link");
          setIsLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        })
        .catch((error) => {
          // console.log("Have errror", error.response.data.message);
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }

    // sendPasswordResetEmail(auth, email)
    //   .then(() => {
    //     toast.success("Check your email for a reset link");
    //     setIsLoading(false);
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 5000);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     toast.error(error.message);
    //   });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${cx("auth")}`}>
        <div className={cx("img")}>
          <img src={ResetPassImg} alt="Register" width="400" />
        </div>
        <div className={cx("form")}>
          <h2>Reset Password</h2>
          <Card>
            <form onSubmit={resetPassword}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset Password
              </button>

              <div className={cx("links")}>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
