import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  displayArea: {
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "#fff",
      marginBottom: "10px",
    },
  },
  carouselContainer: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  paperContainer: {
    width: "100%",
    height: "100%",
    padding: "6px 0px 7px 0px",
  },
  category: {
    position: "relative",
    padding: "4px 0px 4px 5px",
    overflowY: "hidden",
    "&:hover": {
      "& $categoryScrollFab": {
        display: 'flex'
      }
    }
  },
  mainCategory: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  eachCategory: {
    color: "#424242",
    padding: "6px 8px 0.5px 8px",
    "&:hover": {
      color: "#e67700",
    },
  },
  categoryScrollFab: {
    display: 'none',
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  brandItem: {
    overflow: "hidden",
  },
  lazyLoad: {
    position: "relative",
    paddingTop: "96%",
  },
  brandImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  hideFrmMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
export default useStyles;
