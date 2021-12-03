import React, { useState, useEffect, useReducer } from 'react'
 import useStyles from '../styles/ProductUpload'
 import {
     Button,
     Typography,
     Paper,
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
 import {checkLogin} from '../utils/checkInputs'
import firebase from 'firebase/app'
import 'firebase/auth'

 const initialInput = {
    email: "",
    password: "",
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
   
 function Resume() {
       const initialError = {}
     const classes = useStyles()
     const [buttonLoading, setButtonLoading] = useState(false);
     const [input, setInput] = useReducer(reducer, initialInput);
     const [errors, setErrors] = useState(initialError);
     CleanUpLoader()
     useEffect(() => {
    
     }, [])
 
     const formHandler = (e) => {
       setErrors({...errors, [e.target.name]: undefined});
       setInput({ type: "insertValue", field: e.target.name, fieldValue: e.target.value });
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
            const {valid, checkErrors} = checkLogin(input);
            if(!valid) {
              return setErrors({...errors, ...checkErrors});
            }
            setButtonLoading(true)
            firebase.auth().signInWithEmailAndPassword(input.email, input.password)
            .then((userCredential) => {
                setButtonLoading(false)
                setInput({ type: "removeValue"});
               return window.location.href = "/admin/customers";
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
         <div className="container pageComponents">
           <div className={classes.paperWrapper}>
             <Paper className={classes.mainContainer}>
             <Typography variant="h5" className={classes.heading}>
             Admin Login
           </Typography>
           <form
             autoComplete="off"
             method="POST"
             name="loginForm"
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
               </div>
           </form>
             </Paper>
         </div>
         </div>
     )
 }
 
 export default Resume
 
