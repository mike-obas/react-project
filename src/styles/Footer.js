import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
      marginTop: "50px",
      backgroundColor: "#f2f2f2",
    },
    newsLetterArea: {
      backgroundColor: "#ff901a",
      padding: "15px 0px",
    },
    newsLetterinnerWrapper: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "0px 20px",
    },
    subscribeIcon: {
      fontSize: "50px",
      color: "#4d4d4d",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10vw",
      },
    },
    subscribeTextArea: {
      [theme.breakpoints.down("xs")]: {
        marginLeft: '-15px'
      }
    },
    subscribeText: {
      color: "#4d4d4d",
    },
    search: {
      maxWidth: "450px",
      padding: "0px 2px 0px 6px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
    },
    button: {
      textTransform: "capitalize",
      backgroundColor: "#4d4d4d",
      color: "#fff",
      display: "flex",
      wrap: "nowrap",
      padding: theme.spacing(1, 3),
      height: "100%",
      "&:hover": {
        backgroundColor: "#262626",
      },
      boxShadow: theme.shadows[2],
    },
    inputRoot: {
      color: "#424242",
      width: "100%",
      padding: theme.spacing(0.7, 3, 0.7, 1),
    },
    subscribeInput: {
      [theme.breakpoints.down("xs")]: {
        paddingTop: 0,
      },
    },
    mainFooter: {
      paddingTop: "20px",
    },
    wrapMainFooter: {
      padding: "0px 20px",
    },
    title: {
      fontWeight: "bold",
      marginBottom: "4px",
    },
    listItem: {
      padding: 0,
      "&:hover": {
        color: "#e67700",
      },
    },
    footerImageContainer: {
      position: "relative",
      height: "50%",
      width: "50%",
      paddingBottom: "10px",
    },
    img: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    contactText: {
      color: "#4d4d4d",
      "&:hover": {
        color: "#ff901a",
      },
    },
    socialIcon: {
      fontSize: "30px",
      color: "#000000",
    },
    iconButton: {
      paddingLeft: 0,
    },
    addressText: {
      paddingTop: "10px",
      fontWeight: "bold",
    },
    accordionHeading: {
      fontWeight: 'bold'
    },
    mobileQuickActions: {
      backgroundColor: 'lightgrey'
    },
    footerBase: {
      marginTop: "30px",
      backgroundColor: "lightgrey",
      [theme.breakpoints.down("xs")]: {
        marginTop: 2,
      }
    },
    innerFooterBase: {
      padding: "20px",
      textAlign: "center",
    },
    creditcardIcons: {
      padding: 5,
    },
    creditIcons: {
      fontSize: "28px",
      color: "#000000",
    },
    hideFrmMobile: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }));

  export default useStyles