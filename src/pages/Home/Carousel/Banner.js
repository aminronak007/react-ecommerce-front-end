import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../../constraint/data";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  image: {
    width: "100%",
    height: "300",
  },
});

const Banner = () => {
  const classes = useStyle();
  return (
    <Carousel
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          background: "#ffffff",
          color: "#494949",
          borderRadius: 0,
          margine: 0,
        },
      }}
      className={classes.Carousel}
    >
      {bannerData.map((image) => (
        <img src={image} className={classes.image} alt="img" />
      ))}
    </Carousel>
  );
};

export default Banner;
