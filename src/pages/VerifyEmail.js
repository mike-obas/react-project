import React from 'react';
import {useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from '../axiosConfig'
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import CleanUpLoader from "../utils/CleanUpLoader";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

function VerifyEmail() {
  CleanUpLoader()
const consumeContext = useContext(UseContext)
const { token } = useParams();
const classes = useStyles();
const [open, setOpen] = React.useState(false);
useEffect(() => {
let cancel = false;
setOpen(!open);


if(token){
let decoded = jwtDecode(token);

axios.post("/verifyEmail", {uid: decoded.uid})
.then(res => {
    if(cancel) return;
    let modalContent = {
        open: true,
        message: res.data.message,
        successLink: "login",
        successLinkText: 'okay',
        cancelText: '',
        }
        setOpen(false);
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
})
.catch(err => {
    console.log(err)
    let modalContent = {
        open: true,
        message: err.response.data.error,
        successLink: "login",
        successLinkText: 'okay',
        cancelText: '',
        errorIcon: true
        }
        setOpen(false);
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
})
}
else{
    if(cancel) return;
    let modalContent = {
        open: true,
        message: "Please click on the link that was sent to your email to authenticate here",
        successLink: "login",
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

export default VerifyEmail