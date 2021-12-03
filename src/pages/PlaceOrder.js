import React, {useState, useEffect} from 'react'
import { Typography, Paper, Divider, Grid } from '@material-ui/core';
import { Currency, Formatter } from "../utils/Currency";
import axios from '../axiosConfig';
import Button from '@material-ui/core/Button';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import useStyles from '../styles/PlaceOrder'
import CircularProgress from '../components/CircularProgress'
import { OneLineTextSkeleton } from "../utils/ProductSkeleton";
import CleanUpLoader from "../utils/CleanUpLoader"
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import firebase from 'firebase/app'
import 'firebase/auth'

function PlaceOrder() {
  CleanUpLoader()
 const classes = useStyles()
 const initialError = {}
 const [input, setInput] = useState(null)
 const [errors, setErrors] = useState(initialError);
 const [buttonLoading, setButtonLoading] = useState(false);
 const [transferLoading, setTransferLoading] = useState(false);
 const [cashLoading, setCashLoading] = useState(false);
 const consumeContext = useContext(UseContext)

    const localStorage = window.localStorage;
    useEffect(() => {
      let cancel = false;
      if(localStorage.getItem("unpaidOrder")){
        let orderId = localStorage.getItem("unpaidOrder");
      axios.get(`/singleQuery/orders/${orderId}`)
      .then(res => {
        if (cancel) return;
        setInput(res.data);
      })
      .catch(err => {
        setErrors(err.response.data)
      })
    }else{
      if (cancel) return;
      return setErrors({general: 'no order found, kindly shop and return here'})
    }
      return () => {
       cancel = true
      }
      // eslint-disable-next-line
    }, []);
//get user id
useEffect(() => {
  let cancel = false;
  firebase.auth().onAuthStateChanged((user) => {
    if (cancel) return;
    if (user) { 
        let uid = user.uid;
        axios.get(`/singleQuery/users/${uid}`)
        .then(res => {
            if (cancel) return;
            if(res.data.promo !== undefined && res.data.promo !== "used"){
              const value = {promo: "used"}
            return axios.post(`/updateField/users/${uid}`, value);
          }
          else {}
        })
        .catch();
    }
    else{}
    });
  return () => {
    cancel = true;
  }
}, [])

    const handleCardPayment = () => {
        setButtonLoading(true)
        let orderId = localStorage.getItem("unpaidOrder");
        const payLoad = {
            orderId: orderId,
            totalPrice: input.totalPrice,
            currency:"NGN",
            redirect_url:"https://ntek.ng/validate",
            email: input.email,
            phoneNumber: input.phoneNumber,
            name: `${input.firstName} ${input.surname}`,
            title: "Purchase of products from Ntek store",
            description: "Ntek Electronics Payment",
            logo: "https://firebasestorage.googleapis.com/v0/b/ntek-eaa43.appspot.com/o/productImages%2Fresized%2F49495N-tek_Black%20Mark_600x600.webp?alt=media"
         }

        axios.post("/payment/card", payLoad)
        .then(res => {
            setButtonLoading(false)
            window.location.href = res.data.data.link;
        })
        .catch(err => {
            setButtonLoading(false)
            setErrors(err.response.data)
        })
    }

    const handleBankTransfer = () => {
      setTransferLoading(true)
      let orderId = localStorage.getItem("unpaidOrder");
      const payLoad = {
          orderId: orderId,
          totalPrice: input.totalPrice,
          currency:"NGN",
          redirect_url:"https://ntek.ng/validate",
          email: input.email,
          phoneNumber: input.phoneNumber,
          name: `${input.firstName} ${input.surname}`,
          title: "Purchase of products from Ntek store",
          description: "Ntek Electronics Payment",
          logo: "https://firebasestorage.googleapis.com/v0/b/ntek-eaa43.appspot.com/o/productImages%2Fresized%2F49495N-tek_Black%20Mark_600x600.webp?alt=media"
       }

      axios.post("/payment/banktransfer", payLoad)
      .then(res => {
          setTransferLoading(false)
          window.location.href = res.data.data.link;
      })
      .catch(err => {
          setTransferLoading(false)
          setErrors(err.response.data)
      })
  }

  const handleCashOnDelivery = () => {
    setCashLoading(true)
    let orderId = localStorage.getItem("unpaidOrder");
    const payLoad = { orderId: orderId }
    axios.post("/cashOnDelivery", payLoad)
    .then(res => {
      let modalContent = {
        open: true,
        message: res.data.message,
        successLink: "lentz",
        successLinkText: 'okay',
        cancelText: '',
        //errorIcon: true
        }
        localStorage.removeItem("unpaidOrder");
        localStorage.removeItem("cartItems");
        setCashLoading(false)
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
    })
    .catch(err => {
      setCashLoading(false)
      setErrors(err.response.data)
    })
}

    return (
        <div className="container pageComponents">
            <Paper className={classes.mainContianer}>
                <Typography variant="h5" className={classes.heading}>
                    Complete Your Order
                </Typography>

                <Divider className={classes.divider} />
          <Grid container spacing={3} className={classes.total}>
                    <Grid item xs={6} className={classes.totalTextContainer}>
                        <Typography variant="h5" className={classes.totalAmount}>
                         Amount:
                        </Typography>
                        </Grid>
                        <Grid item xs >
                        <Typography variant="h5" className={classes.totalAmount}>
                        {input && Currency.naira}
                        {input ? Formatter(input.totalPrice) : <OneLineTextSkeleton />}
                        </Typography>
                        </Grid>
                   </Grid>
                   <Divider className={classes.divider} />
                    <Typography 
                    variant="h6" 
                    className={classes.shippingHeading}
                    >
                    Shipping Address
                    </Typography>
                    <Typography variant="body2" className={classes.textArea}>
                    {input && `${input.deliveryAddress} ${input.state.toUpperCase()}, 
                    ${input.country.toUpperCase()}.`}
                    </Typography> 
                <Divider className={classes.divider} />
                <Grid container justify="center" alignItems="center">
                    <Typography variant="h6" className={classes.paymentHeading}>
                        Payment Method</Typography>
                    </Grid>
                    <div className={classes.buttonArea}>
                    <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<CreditCardRoundedIcon />}
                    className={classes.paymentButton}
                    size="large"
                    disabled={buttonLoading}
                    onClick={handleCardPayment}
                    >
                    Pay with card
                    {buttonLoading && ( <CircularProgress /> )}
                    </Button>
                    <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AccountBalanceRoundedIcon />}
                    className={classes.paymentButton}
                    fullWidth
                    size="large"
                    disabled={transferLoading}
                    onClick={handleBankTransfer}
                    >
                    Bank Transfer
                    {transferLoading && ( <CircularProgress /> )}
                    </Button>
                    <Button
                    fullWidth
                    size="large"
                    startIcon={<LocalAtmRoundedIcon />}
                    variant="contained"
                    color="primary"
                    className={classes.paymentButton}
                    disabled={cashLoading}
                    onClick={handleCashOnDelivery}
                    >
                    cash on delivery
                    {cashLoading && ( <CircularProgress /> )}
                    </Button>
                    <Typography variant="caption" color="error">
                    {errors.error && errors.error}
                    </Typography>
                    </div>
            </Paper>
        </div>
    )
}

export default PlaceOrder
