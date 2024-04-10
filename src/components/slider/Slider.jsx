import styles from "./Slider.module.scss";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { sliderData } from "./Slider-data";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = sliderData.length;

  // const [autoSlide, setAutoSlide] = useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (autoSlide) {
  //       nextSlide();
  //       setAutoSlide(false);
  //     }
  //   }, 5000);

  //   return () => {
  //     setAutoSlide(!autoSlide);
  //   };
  // }, [autoSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Đặt thời gian chờ là 5 giây
  
    return () => {
      clearInterval(interval); // Hủy interval khi component unmount
    };
  }, [nextSlide]); // Thêm nextSlide vào mảng dependencies

  
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  return (
    <div className={cx("slider")}>
      <HiOutlineArrowLeft className={cx("arrow", "prev")} onClick={prevSlide} />
      <HiOutlineArrowRight
        className={cx("arrow", "next")}
        onClick={nextSlide}
      />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={
              index === currentSlide ? cx("slide", "current") : cx("slide")
            }
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className={cx("content")}>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  {/* <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a> */}
                  <Link to="/product" className="--btn --btn-primary">
                    Shop Now
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
