import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    mainContianer: {
        maxWidth: '700px',
        padding: '30px 10px',
        margin: '30px auto 100px'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '25px'
    },
    total: {
        padding: '10px 0px 3px 10px',
  
      },
      shippingHeading: {
          margin: '12px auto 8px',
          textAlign: 'center'
      },
      totalTextContainer: {
        [theme.breakpoints.down(300)]: {
          display: 'none'
        }
      },
      totalAmount: {
          textAlign: 'center',
        fontWeight: 700,
        fontSize: '17px',
        [theme.breakpoints.up(400)]: {
          fontSize: '20px'
        }
      },
      textArea: {
        paddingLeft: '7px',
        color: '#4d4d4d',
        margin: '8px auto 15px',
        textAlign: 'center'
      },
      buttonArea: {
        margin: 'auto',
        maxWidth: '300px',
      },
      paymentHeading: {
        margin: '8px 0px'
      },
      paymentButton:{
        margin: '8px 0px',
      },
      divider: {
        margin: "10px 0px",
      }
}))

export default useStyles