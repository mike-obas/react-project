import React, { useState, useEffect, useReducer } from 'react'
import useStyles from '../styles/ProductUpload'
import {
    Button,
    Typography,
    Paper,
    Grid
  } from "@material-ui/core";
  import MenuItem from "@material-ui/core/MenuItem";
  import TextField from "@material-ui/core/TextField";
  import { Link } from 'react-router-dom';
  import CircularProgress from "../components/CircularProgress";
  import axios from '../axiosConfig';
  import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx';
import CleanUpLoader from "../utils/CleanUpLoader"
import FormHelperText from '@material-ui/core/FormHelperText';
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import { checkUserSignUp } from '../utils/checkInputs';
import firebase from 'firebase/app'
import 'firebase/auth'
if (!firebase.apps.length) {
  firebase.initializeApp({
  apiKey: "API-KEY-FROM-ENVIRONMENT-VARIABLE",
  authDomain: "FROM-ENVIRONMENT-VARIABLE",
  projectId: "FROM-ENVIRONMENT-VARIABLE",
  storageBucket: "FROM-ENVIRONMENT-VARIABLE",
  messagingSenderId: "FROM-ENVIRONMENT-VARIABLE",
  appId: "FROM-ENVIRONMENT-VARIABLE",
  measurementId: "FROM-ENVIRONMENT-VARIABLE"
    });
}else {
  firebase.app(); // if already initialized, use that one
}

 const initialInput = {
  state: "lagos",
  country: "nigeria",
  firstName: "",
  surname: "",
  email: "",
  phoneNumber: "",
  deliveryAddress: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
};
  const reducer = (state, action) => {
    switch (action.type) {
      case "insertValue":
        return { ...state, [action.field]: action.fieldValue };
        case "removeValue":
            return initialInput;
      default:
        return state;
    }
  };
  
function SignUp() {
      const initialError = {}
    const classes = useStyles()
    const consumeContext = useContext(UseContext)
    const [buttonLoading, setButtonLoading] = useState(false);
    const [input, setInput] = useReducer(reducer, initialInput);
    const [errors, setErrors] = useState(initialError);
    CleanUpLoader()
    useEffect(() => {
                // console.log(decodedToken)
                // history.push("/login")
    }, [])

    const formHandler = (e) => {
      setErrors({...errors, [e.target.name]: undefined});
      setInput({ 
        type: "insertValue", 
        field: e.target.name, 
        fieldValue: e.target.value
      });
    }

    const handlePassword = (prop) => (event) => {
      setErrors({...errors, [prop]: undefined});
        setInput({ type: "insertValue", field: prop, 
        fieldValue: event.target.value});
      };

    const handleClickShowPassword = () => {
        setInput({ type: "insertValue", field: "showPassword", 
        fieldValue: !input.showPassword});
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


      const submitHandler = (e) => {
        e.preventDefault()
        setErrors({});
        const {valid, checkErrors} = checkUserSignUp(input);
        if(!valid) {
          return setErrors({...errors, ...checkErrors});
        }
        setButtonLoading(true)
        firebase.auth().createUserWithEmailAndPassword(input.email, input.password)
        .then((userCredential) => {
            let user = userCredential.user;
            const computValue= {...input, uid: user.uid}
        return axios.post("/userSignUp", computValue)
        })
        .then(res => {
          let modalContent = {
            open: true,
            message: res.data.message,
            successLink: "",
            successLinkText: '',
            cancelText: 'okay'
            //errorIcon: true
            }
            setInput({ type: "removeValue"});
            setButtonLoading(false)
            return consumeContext.setModal({ type: "open", modalContent: modalContent })
          })
        .catch((error) => {
           setErrors({error: error.message});
           setButtonLoading(false);
        });
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
        <title>User account registration</title>
        <meta name="description" content="Register at Ntek and enjoy massive discounts" />
      </Helmet>
        <div className="container pageComponents">
          <div className={classes.paperWrapper}>
            <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            Sign Up
          </Typography>
          <form
            autoComplete="off"
            method="POST"
            name="signupForm"
            noValidate
            encType="multipart/form-data"
          >
            <div className={classes.formInnerWrapper}>
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
              <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
        <FormControl 
        variant="outlined" 
        className={clsx(classes.field)}
        size="small"
        margin="normal"
        error={errors.password && true}
        >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={input.showPassword ? 'text' : 'password'}
            value={input.password}
            onChange={handlePassword('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {input.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText id="password-helper-text">
          {errors.password && errors.password}
        </FormHelperText>
        </FormControl>
        </Grid>
            <Grid item xs={12} sm={6}>
        <FormControl 
        size="small"
        variant="outlined" 
        margin="normal"
        className={clsx(classes.field)}
        error={errors.confirmPassword && true}
        >
          <InputLabel 
          htmlFor="outlined-adornment-confirmPassword"
          >
            Confirm Password
            </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirmPassword"
            type={input.showPassword ? 'text' : 'password'}
            value={input.confirmPassword}
            onChange={handlePassword('confirmPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {input.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={130}
          />
          <FormHelperText id="password-helper-text">
          {errors.confirmPassword && errors.confirmPassword}
              </FormHelperText>
        </FormControl>
        </Grid>
        </Grid>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
              <TextField
               className={clsx(classes.field)}
                select
                label="State"
                name="state"
                margin="normal"
                value={input.state}
                onChange={formHandler}
                variant="outlined"
                size="small"
              >
                {state.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
              className={clsx(classes.field)}
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
              </Grid>
              </Grid>
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
            <div className={classes.submitButton}>
              <Typography variant="caption" color="error">
                {errors.error && errors.error}
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
                  Submit
                </Typography>
              </Button>
              <div style={{height: '3px'}}></div>
              <Typography variant="caption" color="textSecondary">
                By signing up, you agree to our terms and policy.
                <Link 
                to="/privacy_policy"
                className="coloredLink"
                >
                &nbsp;read more
                </Link>
              </Typography>
            </div>
          </form>
            </Paper>
        </div>
        </div>
        </React.Fragment>
    )
}

export default SignUp
