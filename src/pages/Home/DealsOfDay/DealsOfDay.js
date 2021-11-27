import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { products } from "../../../constraint/data";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Countdown from "react-countdown";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyle = makeStyles({
  component: {
    margin: 20,
    background: "white",
  },
  deal: {
    padding: "15px 20px",
    display: "flex",
  },
  dealText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    marginRight: 25,
  },
  timer: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: 150,
    justifyContent: "space-between",
  },
  button: {
    marginLeft: "auto",
    background: "black",
    borderRadius: 2,
    fontSize: "13px",
  },
  text: {
    fontSize: "14px",
    marginTop: 5,
  },
  wrapper: {
    padding: "35px 15px",
  },
});
const Slide = () => {
  const Classes = useStyle();
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className={Classes.timer}>
        {hours} : {minutes} : {seconds} Left
      </span>
    );
  };

  return (
    <Box className={Classes.component}>
      <Box className={Classes.deal}>
        <Typography className={Classes.dealText}>Deal of the Day</Typography>
        <img src={timerURL} style={{ width: 24 }} alt="img" />
        <Countdown date={Date.now() + 8.64e7} renderer={renderer} />
        <Button variant="contained" color="primary" className={Classes.button}>
          View All
        </Button>
      </Box>
      <Divider />
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((product) => (
          //  jsx return only one element

          <Box textAlign="center" className={Classes.wrapper}>
            <a href="/">
              <img
                src={product.url}
                className={`${Classes.image} deals-of-day`}
                alt="img"
              />

              <Typography
                className={Classes.text}
                style={{ fontWeight: 600, color: "black" }}
              >
                {product.title.shortTitle}
              </Typography>
            </a>
            <Typography className={Classes.text} style={{ color: "green" }}>
              {product.discount}
            </Typography>
            <Typography className={Classes.text} style={{ color: "gray" }}>
              {product.tagline}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
