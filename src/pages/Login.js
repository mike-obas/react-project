import React, { useState, useEffect, useReducer } from 'react'
import useStyles from '../styles/ProductUpload'
import {
    Button,
    Typography,
    Paper
  } from "@material-ui/core";
  import TextField from "@material-ui/core/TextField";
  import CircularProgress from "../components/CircularProgress";
  import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import CleanUpLoader from "../utils/CleanUpLoader"
import FormHelperText from '@material-ui/core/FormHelperText';
import {Helmet} from 'react-helmet-async'
import {Link} from 'react-router-dom'
import { checkLogin } from '../utils/checkInputs';
import firebase from 'firebase/app'
import 'firebase/auth'

const initialInput = {
  email: "",
  password: ""
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
  
function Login() {
      const initialError = {}
    const classes = useStyles()
    const [buttonLoading, setButtonLoading] = useState(false);
    const [input, setInput] = useReducer(reducer, initialInput);
    const [errors, setErrors] = useState(initialError);
    CleanUpLoader()
    useEffect(() => {
      let cancel = false;
  firebase.auth().onAuthStateChanged((user) => {
      if (cancel) return;
      if (user && !user.disabled) { 
       window.location.href = "/user/user_dashboard"
      }
      else{}
      });
      return () => {cancel = true }
      }, [])


    const formHandler = (e) => {
      setErrors({...errors, [e.target.name]: undefined});
      setInput({ type: "insertValue", field: e.target.name, fieldValue: e.target.value });
    }

    const handlePassword = (prop) => (event) => {
        setInput({ type: "insertValue", field: prop, 
        fieldValue: event.target.value});
        setErrors({...errors, [prop]: undefined});
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
        const {valid, checkErrors} = checkLogin(input);
        if(!valid) {
          return setErrors({...errors, ...checkErrors});
        }
        setButtonLoading(true)
        firebase.auth().signInWithEmailAndPassword(input.email, input.password)
        .then((userCredential) => {
            setButtonLoading(false)
            setInput({ type: "removeValue"});
           return window.location.href = "/user/user_dashboard";
          })
        .catch((error) => {
            if(error.code === "auth/wrong-password"){
                setErrors({error: "Invalid password."});
            }
            else{setErrors({error: error.message});}
           setButtonLoading(false);
        });

      }


    return (
      <React.Fragment>
        <Helmet>
        <title>Ntek user login</title>
        <meta name="description" content="Manage orders with ease" />
      </Helmet>
        <div className="container pageComponents">
          <div className={classes.paperWrapper}>
            <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            Login
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

        <FormControl 
        variant="outlined" 
        className={clsx(classes.spaceField, classes.field)}
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
                  Login
                </Typography>
              </Button>
              <div style={{height: '7px'}}></div>
              <Typography variant="body2" color="inherit">
               Don't have an account?
                <Link 
                to="/signup"
                className="coloredLink"
                >
                &nbsp;&nbsp;Register
                </Link>
              </Typography>
              <div style={{height: '5px'}}></div>
              <Typography variant="body2" color="textSecondary">
                <Link 
                to="/change_password"
                className="coloredLink"
                >
                Forgot password?
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

export default Login
