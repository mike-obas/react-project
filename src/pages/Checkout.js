import React, { useState, useEffect, useReducer } from 'react'
import useStyles from '../styles/ProductUpload'
import {
    Button,
    Grid,
    Typography,
    Paper,
    Divider
  } from "@material-ui/core";
  import MenuItem from "@material-ui/core/MenuItem";
  import TextField from "@material-ui/core/TextField";
  import { Currency, Formatter } from "../utils/Currency";
  import CircularProgress from "../components/CircularProgress";
  import CleanUpLoader from "../utils/CleanUpLoader";
  import axios from '../axiosConfig';
  import { useHistory } from "react-router-dom";
  import {Helmet} from 'react-helmet-async'
  import firebase from 'firebase/app'
import 'firebase/auth'

  const reducer = (state, action) => {
    switch (action.type) {
      case "inertValue":
        return { ...state, [action.field]: action.fieldValue };
        case "insertAll": 
        return {...state, ...action.dataObject}
      default:
        return state;
    }
  };
  
function Checkout() {
    const initialInput = {
        state: "lagos",
        country: "nigeria",
        firstName: "",
        surname: "",
        email: "",
        phoneNumber: "",
        deliveryAddress: "",
        totalPrice: ""
      };
      const initialError = {}
    const classes = useStyles()
    const [buttonLoading, setButtonLoading] = useState(false);
    const [input, setInput] = useReducer(reducer, initialInput);
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [errors, setErrors] = useState(initialError);
    let history = useHistory();
    const localStorage = window.localStorage;

    CleanUpLoader();

    useEffect(() => {
      let cancel = false;
  firebase.auth().onAuthStateChanged((user) => {
      if (cancel) return;
      if (user) { 
          let uid = user.uid;
          axios.get(`/singleQuery/users/${uid}`)
          .then(res => {
              if (cancel) return;
              if(res.data.state !== 'lagos' && res.data.state !== undefined) {
                setDeliveryFee(2000)
              }
              else{
                setDeliveryFee(0)
              }
              return setInput({type: "insertAll", dataObject: res.data})
          })
          .catch(err => {
              //setErrors(err.response.data)
          });
      }
      else{}
      });
      return () => {cancel = true }
      }, [])

    useEffect(() => {
      let cancel = false;
      if(localStorage.getItem("partialOrder")){
        let orderId = localStorage.getItem("partialOrder");
      axios.get(`/singleQuery/orders/${orderId}`)
      .then(res => {
        if (cancel) return;
        setInput({ type: "inertValue", field: "totalPrice", 
        fieldValue: (res.data.totalPrice + deliveryFee)});
      })
      .catch(err => {
        setErrors(err.response.data)
      })
    }else if(localStorage.getItem("unpaidOrder")) {
      if (cancel) return;
      history.push("/place_order");
    }else{
      if (cancel) return;
      setErrors({general: 'no order found, kindly shop and return here'})
    }
      return () => {
       cancel = true
      }
      // eslint-disable-next-line
    }, [deliveryFee])

    const formHandler = (e) => {
      setErrors({...errors, [e.target.name]: undefined});
      setInput({ 
        type: "inertValue", 
        field: e.target.name, 
        fieldValue: e.target.value 
      });
    }
    const stateHandler = (e) => {
      setErrors({});
      if(e.target.value !== 'lagos') {
        setDeliveryFee(2000)
      }
      else{
        setDeliveryFee(0)
      }
      setInput({ type: "inertValue", field: e.target.name, fieldValue: e.target.value });
    }

    const submitHandler = (e) => {
      e.preventDefault()
      setButtonLoading(true)
      if(localStorage.getItem("partialOrder")){
        let orderId = localStorage.getItem("partialOrder");
        axios.post(`/checkout/${orderId}`, input)
        .then(res => {
          localStorage.setItem("unpaidOrder", res.data)
          localStorage.removeItem("partialOrder");
          setButtonLoading(false)
          history.push("/place_order");
        })
        .catch(err => {
          setErrors(err.response.data)
          setButtonLoading(false)
        })
      }else {
      setButtonLoading(false)
      setErrors({general: 'no order found, kindly shop and return here'})
      }
    }

    const state = [
        {
          value: "abia",
          label: "Abia",
        },
        {
          value: "adamawa",
          label: "Adamawa",
        },
        {
          value: "akwa_ibom",
          label: "Akwa Ibom",
        },
        {
          value: "anambra",
          label: "Anambra",
        },
        {
          value: "bauchi",
          label: "Bauchi",
        },
        {
          value: "bayelsa",
          label: "Bayelsa",
        },
        {
          value: "benue",
          label: "Benue",
        },
        {
          value: "borno",
          label: "Borno",
        },
        {
          value: "edo",
          label: "Edo",
        },
        {
          value: "delta",
          label: "Delta",
        },
        {
          value: "ebonyi",
          label: "Ebonyi",
        },
        {
          value: "ekiti",
          label: "Ekiti",
        },
        {
          value: "enugu",
          label: "Enugu",
        },
        {
          value: "fct",
          label: "FCT",
        },
        {
            value: "gombe",
            label: "Gombe",
          },
          {
            value: "imo",
            label: "Imo",
          },
          {
            value: "jigawa",
            label: "Jigawa",
          },
          {
            value: "kaduna",
            label: "Kaduna",
          },
          {
            value: "kano",
            label: "Kano",
          },
          {
            value: "katsina",
            label: "Katsina",
          },
          {
            value: "kebbi",
            label: "Kebbi",
          },
          {
            value: "kogi",
            label: "Kogi",
          },
          {
            value: "kwara",
            label: "Kwara",
          },
          {
            value: "lagos",
            label: "Lagos",
          },
          {
            value: "nasarawa",
            label: "Nasarawa",
          },
          {
            value: "niger",
            label: "Niger",
          },
          {
            value: "ogun",
            label: "Ogun",
          },
          {
            value: "ondo",
            label: "Ondo",
          },
          {
            value: "osun",
            label: "Osun"
          },
          {
            value: "oyo",
            label: "Oyo",
          },
          {
            value: "plateau",
            label: "Plateau",
          },
          {
            value: "rivers",
            label: "Rivers",
          },
          {
            value: "sokoto",
            label: "Sokoto",
          },
          {
            value: "taraba",
            label: "Taraba",
          },
          {
            value: "yobe",
            label: "Yobe",
          },
          {
            value: "zamfara",
            label: "Zamfara",
          },
      ];

    return (
      <React.Fragment>
        <Helmet>
        <title>Ntek checkout</title>
        <meta name="description" content="Well secured payment outlet" />
      </Helmet>
        <div className="container pageComponents">
          <div className={classes.paperWrapper}>
            <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            Shipping Information
          </Typography>
          <div style={{height: '15px'}}></div>
          <Divider className={classes.divider} />
          <Grid container spacing={3} className={classes.total}>
                    <Grid item xs={3} className={classes.totalTextContainer}>
                        <Typography variant="h5" className={classes.totalAmount}>
                         Amount:
                        </Typography>
                        </Grid>
                        <Grid item xs >
                        <Typography variant="h5" className={classes.totalAmount}>
                        {Currency.naira}
                        {Formatter(input.totalPrice)}
                        </Typography>
                         <Typography variant="body2" className={classes.extraInfo}>
                        + includes
                        {input.state === 'lagos' && ' free shipping within Lagos'}
                        &nbsp;{input.state !== 'lagos' && Currency.naira} 
                        {input.state !== 'lagos' && `${Formatter(2000)} delivery fee`}
                        </Typography>
                        <Typography 
                        variant="caption" 
                        className={classes.additionalInfo}
                        color='primary'>
                        kindly note that orders for heavy items will attract additional fee.
                        </Typography>

                        </Grid>
                   </Grid>
                   <Divider className={classes.divider} />
          <form
            autoComplete="off"
            method="POST"
            name="checkoutForm"
            noValidate
            encType="multipart/form-data"
          >
            <div className={classes.formInnerWrapper}>
              <TextField
                select
                label="State"
                name="state"
                margin="normal"
                value={input.state}
                onChange={stateHandler}
                variant="outlined"
                size="small"
              >
                {state.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={errors.firstName && true}
                helperText={errors.firstName && errors.firstName}
                label="First name"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="firstName"
                value={input.firstName}
                onChange={formHandler}
                className={classes.selectField}
              />

              <TextField
                error={errors.surname && true}
                helperText={errors.surname && errors.surname}
                label="Surname"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="surname"
                value={input.surname}
                onChange={formHandler}
              />
              <TextField
                error={errors.email && true}
                helperText={errors.email && errors.email}
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="email"
                value={input.email}
                onChange={formHandler}
              />
            </div>
              <TextField
                error={errors.phoneNumber && true}
                helperText={errors.phoneNumber && errors.phoneNumber}
                label="Phone number"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={formHandler}
              />
              <TextField
                error={errors.deliveryAddress && true}
                helperText={errors.deliveryAddress && errors.deliveryAddress}
                label="Delivery Address"
                variant="outlined"
                fullWidth
                margin="normal"
                name="deliveryAddress"
                size="small"
                value={input.deliveryAddress}
                onChange={formHandler}
              />
              <TextField
                className={classes.selectField}
                select
                label="Country"
                name="country"
                margin="normal"
                value={input.country}
                onChange={formHandler}
                variant="outlined"
                size="small"
              >
                <MenuItem value="nigeria">Nigeria</MenuItem>
              </TextField>

            <div className={classes.submitButton}>
              <Typography variant="caption" color="error">
                {errors.general && errors.general}
              </Typography>
              <Button
                onClick={submitHandler}
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                disabled={buttonLoading}
                type="submit"
              >
                {buttonLoading && (
                  <CircularProgress />
                )}
                <Typography variant="subtitle1" className={classes.submitText}>
                  Next
                </Typography>
              </Button>
            </div>
          </form>
            </Paper>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Checkout
