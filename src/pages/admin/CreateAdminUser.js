import React, { useState, useReducer } from 'react'
import useStyles from '../../styles/ProductUpload'
import {
    Button,
    Typography,
    Paper,
    Grid
  } from "@material-ui/core";
  import MenuItem from "@material-ui/core/MenuItem";
  import TextField from "@material-ui/core/TextField";
  import CircularProgress from "../../components/CircularProgress";
  import axios from '../../axiosConfig';
  import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import CleanUpLoader from "../../utils/CleanUpLoader"
import FormHelperText from '@material-ui/core/FormHelperText';
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import {checkAdminSignUp} from '../../utils/checkInputs'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Link } from 'react-router-dom';


const initialInput = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    role: "staff"
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
  
function CreateAdminUser() {
      const initialError = {}
    const classes = useStyles()
    const consumeContext = useContext(UseContext);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [input, setInput] = useReducer(reducer, initialInput);
    const [errors, setErrors] = useState(initialError);
    CleanUpLoader()

    // useEffect(() => {
      
    // }, [])

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
        const {valid, checkErrors} = checkAdminSignUp(input);
        if(!valid) {
          return setErrors({...errors, ...checkErrors});
        }
        setButtonLoading(true)
         axios.post("/adminSignUp", input)
        .then(res => {
          let modalContent = {
            open: true,
            message: res.data.message,
            successLink: "admin/logout",
            successLinkText: 'okay',
            cancelText: ''
            //errorIcon: true
            }
            setButtonLoading(false)
            setInput({ type: "removeValue"});
            return consumeContext.setModal({ type: "open", modalContent: modalContent })
          })
        .catch((error) => {
           setErrors({error: error.message});
           setButtonLoading(false);
        });
      }

    return (
        <div className="container pageComponents">
          {
            consumeContext.authState.state ?
            <React.Fragment>
          { !consumeContext.authState.disabled ?
            <React.Fragment>
          { consumeContext.authState.role === "administrator" &&
            <div className={classes.paperWrapper}>
            <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            Create Admin User
          </Typography>
          <form
            autoComplete="off"
            method="POST"
            name="adminSignupForm"
            noValidate
            encType="multipart/form-data"
          >
            <div className={classes.formInnerWrapper}>
              <TextField
                error={errors.name && true}
                helperText={errors.name && errors.name}
                label="name"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="name"
                value={input.name}
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
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
        <Grid item xs={12}>
              <TextField
                className={clsx(classes.field)}
                select
                label="role"
                name="role"
                margin="normal"
                value={input.role}
                onChange={formHandler}
                variant="outlined"
                size="small"
              >
                <MenuItem value="administrator">Administrator</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </TextField>
              </Grid>
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
            </div>
          </form>
            </Paper>
        </div>}
        </React.Fragment>
        :
        <Typography style={{padding: 40}} variant="body2" color="error">
          {!consumeContext.authState.initializing &&
          "Your account has been disabled, contact support team"
          }
        </Typography>
        }
        </React.Fragment>
        :
        <Typography style={{padding: 40}} variant="body2" color="error">
         {!consumeContext.authState.initializing && "session timed out "}
         {!consumeContext.authState.initializing && (
           <Link to="/resume" >
             login again
           </Link>
         )}
        </Typography>
      }
      {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body2" color="textSecondary">
          ...checking credentials
        </Typography>
      }
        </div>
    )
}

export default CreateAdminUser
