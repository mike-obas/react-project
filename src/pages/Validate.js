import React from 'react';
import {useEffect} from 'react'
import {useLocation} from "react-router-dom";
import axios from '../axiosConfig'
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CleanUpLoader from "../utils/CleanUpLoader";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

function Validate() {
const consumeContext = useContext(UseContext)
CleanUpLoader()
const classes = useStyles();
  const [open, setOpen] = React.useState(false);
const search = useLocation().search;
useEffect(() => {
let cancel = false;
setOpen(!open);
const tx_ref = new URLSearchParams(search).get('tx_ref');
const transaction_id = new URLSearchParams(search).get('transaction_id');
const status = new URLSearchParams(search).get('status');
if(transaction_id && status && status === "successful"){
axios.post("/validate", {orderId: tx_ref, transactionId: transaction_id})
.then(res => {
    if(cancel) return;
    let modalContent = {
        open: true,
        message: res.data.message,
        successLink: "eltak",
        successLinkText: 'okay',
        cancelText: '',
        //errorIcon: true
        }
        localStorage.removeItem("unpaidOrder");
        localStorage.removeItem("cartItems");
        setOpen(false);
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
})
.catch(err => {
    console.log(err)
    let modalContent = {
        open: true,
        message: err.response.data.error,
        successLink: "lentz",
        successLinkText: 'okay',
        cancelText: '',
        errorIcon: true
        }
        localStorage.removeItem("unpaidOrder");
        localStorage.removeItem("cartItems");
        setOpen(false);
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
})
}
else{
    if(cancel) return;
    let modalContent = {
        open: true,
        message: "Sorry, transaction failed. This maybe due to network error or incomplete payment processes. Please try again. If error persists, kindly contact our support team via support@ntek.ng",
        successLink: "place_order",
        successLinkText: 'okay',
        cancelText: '',
        errorIcon: true
        }
        setOpen(false);
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
}
return () => { cancel = true }
// eslint-disable-next-line
}, [])


return (<div style={{height: '1000px'}}>
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>);
}

export default Validate