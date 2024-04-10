import styles from "./Contact.module.scss";
import classNames from "classnames/bind";
import Card from "./../../components/card/Card";

import { useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Contact = () => {
  // console.log(process.env);
  // console.log(import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    // console.log(form.current);

    emailjs
      .sendForm(
        import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
        "template_hijgy5t",
        form.current,
        "6s8G0VShPUXyPU4tX"
      )
      .then(
        (result) => {
          // console.log(result);
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${cx("contact")}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+234 705 141 6545</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>duck@eshop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>TP Ho Chi Minh</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Duck_Huu</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
