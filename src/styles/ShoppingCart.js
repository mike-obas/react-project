import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    generalContainer: {
        marginBottom: '100px'
    },
    mainContainer: {
        maxWidth: '800px',
        margin: '5px auto 20px',
        padding: '30px 10px'
    },
    cartBasket: {
        textAlign: 'center',
        padding: '5px 0px',
        [theme.breakpoints.up("md")]: {
        padding: '15px 0px 5px',
        }
    },
    cartIconBtn: {
        padding: 0
    },
    boldText: {
        fontWeight: 700
    },
    itemContainer: {
        paddingBottom: '5px'
    },
    imageContainer: {
      position: "relative",
      paddingTop: "100%",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: 'contain'
    },
    productPrice: {
        fontWeight: 700,
        marginTop: '2px'
    },
    formerPrice: {
    textDecoration: "line-through",
    },
    subtotal: {
        marginTop: '-3px',
        color: '#808080'
    },
    quantityText: {
        [theme.breakpoints.down(330)]: {
            display: 'none'
        },
        //display: 'none'
    },
    quantityWrapper: {
        marginTop: "3px",
      },
      quantityButtonGroup: {
        height: "25px",
        maxWidth: "100%",
        //boxShadow: theme.shadows[1]
      },
      total: {
        padding: '2px 0px 3px'
      },
      totalAmount: {
        fontWeight: 700,
      },
      checkoutContainer: {
        padding: '20px 0px 0px'
      },
      promo: {
        color: 'green'
      },
      divider: {
        margin: "10px 0px",
      },
}));

export default useStyles