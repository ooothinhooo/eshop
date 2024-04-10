import classNames from "classnames/bind";
import loginImg from "~/assets/images/login.jpg";
import styles from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Card, Loader } from "~/components";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "~/firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import httpRequest from "~/utils/httpRequest";
import axios from "axios";

const cx = classNames.bind(styles);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  //Custom
  // function getCookie(name) {
  //   const cookies = document.cookie.split(";");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].trim();
  //     if (cookie.startsWith(name + "=")) {
  //       return cookie.substring(name.length + 1);
  //     }
  //   }
  //   return null;
  // }

  function getCookie(name) {
    const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }
  const postIdTokenToSessionLogin = async (endpoint, idToken, csrfToken) => {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "X-CSRF-Token": csrfToken,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error posting ID token to session login endpoint");
      }
      console.log("successfully");
      return response.json();
    });
  };
  useEffect(() => {
    async function BlockUser() {
      if (loginAttempts >= 5) {
        const res = await httpRequest
          .post("/auth/blockuser", {
            email,
          })
          .then(() => {
            setIsBlocked(true);
          })
          .catch((error) => console.log(error));
      }
    }
    BlockUser();
  }, [loginAttempts, email]);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isBlocked) {
      toast.error("Your account is blocked.");
      return;
    }

    try {
      const res = await httpRequest.post("/auth/login", {
        email,
        password,
      });
      setIsLoading(false);
      console.log("IdToken", res.data);
      console.log("Status", res.status);

      if (res.status == 200) {
        navigate("/");
        toast.success("Login Successfully...");
      } else {
        setLoginAttempts(loginAttempts + 1);
        toast.warning("Password invalid");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }



   

    // signInWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;

    //     return user.getIdToken().then((idToken) => {
    //       setIsLoading(false);
    //       console.log("IdToken", idToken);

    //       navigate("/");
    //       toast.success("Login Successfully...");

    //       // const csrfToken = getCookie("csrfToken");
    //       // console.log("csrf Token", csrfToken);
    //       // return postIdTokenToSessionLogin("/sessionLogin", idToken, csrfToken);
    //     });
    //   })
    //   .catch((error) => {
    //     // setAttempLogin((PrevattempLogin) => ({}));
    //     setIsLoading(false);
    //     toast.error(error.message);
    //     console.log("error", error);
    //   });
  };

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // console.log("token user", user.email);
        toast.success("Login Successfully...");
        if (user.email == "kidkender@gmail.com") {
          navigate("/admin/home");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user
        console.log(user)
        setLoading(false)
        toast.success("Đã đăng nhập thành công")
        navigate('/')


    } catch (error) {
        setLoading(false)
        toast.error(error.message)
    }

}
  const handleFormEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // setvalidEmail(ValidateEmail(newEmail));
  };

  return (
    <>
      <ToastContainer />

      {isLoading && <Loader />}
      <section className={`container ${cx("auth")}`}>
        <div className={cx("img")}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <div className={cx("form")}>
          <h2>Login</h2>
          <Card>
            <form onSubmit={signIn}>
              {/* <label htmlFor="email"></label> */}
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleFormEmailChange}
                placeholder="Email"
                // pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                // onInvalid={(e) => {
                //   e.target.setCustomValidity(
                //     "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
                //   );
                // }}
                // onInput={(e) => e.target.setCustomValidity("")}
                required
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={cx("links")}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>---or---</p>
              <button
                type="submit"
                onClick={loginWithGoogle}
                className="--btn --btn-danger --btn-block"
              >
                <FaGoogle color="#fff" />
                &nbsp; Login With Google
              </button>
              <span className={cx("register")}>
                <p>Dont't have an account</p>
                <Link to="/register">Register</Link>
              </span>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Login;
