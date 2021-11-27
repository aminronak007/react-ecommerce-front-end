import { navData } from "../../../constraint/data";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  components: {
    display: "flex",
    margin: "10px 130px 0",
    justifyContent: "space-between",
  },
  container: {
    textAlign: "center",
    padding: "12px 8px",
  },
  image: {
    width: 60,
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
  },
});

const NavBar = () => {
  const classes = useStyle();
  return (
    <div className="row">
      <Box className={classes.components}>
        {navData.map((data) => (
          <a>
            <Box className={classes.container}>
              <img src={data.url} className={classes.image} />
              <Typography className={`${classes.text} navbar-link`}>
                {data.text}
              </Typography>
            </Box>
          </a>
        ))}
      </Box>
    </div>
  );
};

export default NavBar;
