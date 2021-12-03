import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    productContainer: {
      position: "relative",
      paddingTop: '56.25%',
    },
    card: {
      //position: 'absolute',
      padding: 5,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition: 'transform 1s',
      '&:hover': {
          'transform': 'scale(1.04, 1.04)',
          boxShadow: theme.shadows[3]
      }
    },
    media: {
      objectFit: "contain"
    },
    cardContent: {
      padding: "0px 0px 0px 5px",
    },
    cardAction: {
      padding: "0px 5px 10px 5px",
    },
    amount: {
      marginTop: '-5px',
      fontWeight: "bold",
    },
    discountAmount: {
      marginTop: '-3px',
      textDecoration: "line-through",
    },
    addToCart: {
      textAlign: "right",
    },
    cartButton: {
      position: "absolute",
      top: "15%",
      right: "10%",
      backgroundColor: "#e67700",
      color: "#fff",
      padding: 8,
      "&:hover": {
        backgroundColor: "#ff8f00",
      },
      "&:disabled": {
        backgroundColor: fade("#ffb566", 0.9),
        color: "#fff",
      },
    },
    offerType: {
      position: "absolute",
      top: 10,
      left: 15,
      fontWeight: 'bold',
      backgroundColor: "#fff3e6",
      color: "#e67700",
      padding: "2px 8px",
    }
  }));

  export default useStyles