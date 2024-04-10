import Slider from "~/components/slider/Slider";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { Product } from "..";
import { useEffect } from "react";
import Slideshow from "~/components/slider/Slideshow";

const cx = classNames.bind(styles);

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, []);
  return (
    <div>
      {/* <Slider /> */}
      <Slideshow />
      <Product />
    </div>
  );
};

export default Home;
