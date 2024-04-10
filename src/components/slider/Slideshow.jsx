import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";


const cx = classNames.bind(styles);
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundSize: 'cover',
  height: '60rem'
}
const slideImages = [
  {
    url: 'https://nhaxinh.com/wp-content/uploads/2021/10/nha-xinh-phong-khach-sofa-jazz-mau-cognac-phong-cach.jpg',
    caption: 'Slide 1'
  },
  {
    url: 'https://nhaxinh.com/wp-content/uploads/2021/11/CS3423.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'https://nhaxinh.com/wp-content/uploads/2023/07/BST-Coastal-3-3.jpg',
    caption: 'Slide 3'
  },
  {
    url: 'https://nhaxinh.com/wp-content/uploads/2021/10/nha-xinh-phong-khach-hien-dai-poppy-1-1200x800.jpg',
    caption: 'Slide 3'
  },

];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span>
                 */}
                 <div className={cx("content")}>
                  {/* <h2>{slideImage?.heading}</h2>
                  <p>{slideImage?.desc}</p> */}
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                  <Link to="/product" className="--btn --btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow;
