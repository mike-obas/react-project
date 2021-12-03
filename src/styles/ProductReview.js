import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    productWrapper: {
      padding: "10px 0px",
    },
    divider: {
      margin: "10px 0px",
    },
    noBottomDivider:{
      marginTop: "10px",
    },
    iconContainer: {
      padding: 0,
      color: "#e67700",
    },
    darkIcon: {
      color: '#000000'
    },
    shareText: {
      fontWeight: "bold",
    },
    brandContainer: {
      [theme.breakpoints.down("xs")]: {
        marginTop: "-15px",
      },
    },
    brand: {
      color: "#4d4d4d",
      fontWeight: 700,
      textTransform: "capitalize",
    },
    shareMobile: {
      textAlign: "right",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    productName: {
      margin: "10px 0px",
      color: "#000",
      lineHeight: 1.3,
    },
    amount: {
      color: "#000000",
    },
    discountAmount: {
      textDecoration: "line-through",
    },
    discountPercentage: {
      color: "#e67700",
      padding: "3px 5px 3px 0px",
    },
    quantityWrapper: {
      marginTop: "10px",
    },
    quantityButtonGroup: {
      height: "35px",
      maxWidth: "60%",
    },
    countDownButtonGroup: {
      height: "auto",
      width: "auto",
    },
    addToCartButton: {
      margin: "20px 0px 5px",
      color: "#ffffff",
    },
    productReviewTab: {
      flexGrow: 1,
      width: '100%',
    },
    reviewTabAppBar: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '4px 4px 0px 0px',
      boxShadow: theme.shadows[1]
    },
    tabTitle: {
      color: '#000000',
      fontWeight: 'bold'
    },
    deliveryAndReturns: {
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        display: 'none'
      }
    },
    deliveryArea: {
      padding: "10px 0px",
      position: "sticky",
      top: 75,
    },
    infoHeading: {
      marginBottom: '3px',
      fontWeight: 700,
      color: '#000'
    },
    infoIcon: {
        border: "1px solid lightgrey",
        borderRadius: 4,
        textAlign: "center",
    },
    productArea: {
      padding: "15px 10px",
    },
    bottomNav: {
      display: 'none'
    },
    bottomAddToCart: {
      backgroundColor: theme.palette.background.paper,
      position: "fixed",
      width: "100%",
      left: 0,
      bottom: 0,
      padding: '5px 10px',
      zIndex: theme.zIndex.appBar,
      boxShadow: theme.shadows[24],
      [theme.breakpoints.down(345)]: {
        display: 'none'
      }
    },
    bottomPrice: {
      marginTop: '3px',
      textAlign: 'right',
      [theme.breakpoints.down("xs")]: {
          textAlign: 'center'
      }
    },
    bottomNavAmount: {
      display: 'inline-block', 
      border: '1px solid #e67700',
      padding: '6px 12px',
      borderRadius: 4,
    },
    bottomCartButton: { 
      margin: '-10px auto 3px',
      width: '50%',
      [theme.breakpoints.down("xs")]: {
          width: '100%'
      }
    },
    circularProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
      color: '#fff'
    },
      buttonContainer: {
          paddingTop: '30px'
    },
      buttonText: {
          textTransform: 'capitalize'
    },
      noMoreProduct: {
      color: 'green',
      textAlign: 'center'
    }
  }));
  
  export default useStyles