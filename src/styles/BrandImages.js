import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(1),
    width: "100%",
    marginTop: "12px",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      marginTop: "18px",
    },
  },
  eachBrand: {
    overflow: "hidden",
  },
  imageContainer: { 
    borderRadius: "5px",
    position: "relative",
    paddingTop: "45%",
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    transition: "transform 1s",
    "&:hover": {
      transform: "scale(1.04, 1.04)",
      boxShadow: theme.shadows[3],
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "75%",
    },
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  },
  lazyLoad: {
    width: "100%",
    height: "100%",
  },
}));

export default useStyles;
