import React from "react";
import { Carousel } from "antd";
import slider1 from "../../../assets/Images/slider1.png";
import slider2 from "../../../assets/Images/slider2.jpg";
import slider3 from "../../../assets/Images/slider3.jpg";

const contentStyle = {
  height: "450px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Slider = () => {
  return (
    <Carousel autoplay>
      <div>
        <img
          className="responsive-image"
          alt="slider1"
          style={contentStyle}
          src={slider1}
        />
      </div>
      <div>
        <img
          className="responsive-image"
          alt="slider2"
          style={contentStyle}
          src={slider2}
        />
      </div>
      <div>
        <img
          className="responsive-image"
          alt="slider3"
          style={contentStyle}
          src={slider3}
        />
      </div>
    </Carousel>
  );
};
export default Slider;
