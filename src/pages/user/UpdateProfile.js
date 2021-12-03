import React, { useState, useEffect, useReducer } from 'react'
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
import clsx from 'clsx';
import CleanUpLoader from "../../utils/CleanUpLoader"
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

  const reducer = (state, action) => {
    switch (action.type) {
      case "insertValue":
        return { ...state, [action.field]: action.fieldValue };
        case "setValue": 
        return {...state, ...action.dataObject}
      default:
        return state;
    }
  };
  
function SignUp() {
    const initialInput = {
        state: "lagos",
        country: "nigeria",
        firstName: "",
        surname: "",
        email: "",
        phoneNumber: "",
        deliveryAddress: ""
      };
      const initialError = {}
    const classes = useStyles()
    const consumeContext = useContext(UseContext)
    const [buttonLoading, setButtonLoading] = useState(false);
    const [input, setInput] = useReducer(reducer, initialInput);
    const [errors, setErrors] = useState(initialError);
    const [rerender, setRerender] = useState(0)
    CleanUpLoader()
    useEffect(() => {
        let cancel = false;

    firebase.auth().onAuthStateChanged((user) => {
        if (cancel) return;
        if (user && !user.disabled && user.emailVerified) { 
            let uid = user.uid;
            axios.get(`/singleQuery/users/${uid}`)
            .then(res => {
                if (cancel) return;
                let data = {
                    uid: uid,
                    ...res.data
                }
                return setInput({type: "setValue", dataObject: data})
            })
            .catch(err => {
                setErrors(err.response.data)
            });
        }
        else if(user && !user.emailVerified){
            setErrors({notVerified: 'Kindly verify your email address through the link we sent to your mail box'})
        }
        else{
            setErrors({notAuthenticated: 'session has timed out, kindly '})
        }
        });
        return () => {cancel = true }
        }, [rerender])

    const formHandler = (e) => {
      setErrors({...errors, [e.target.name]: undefined});
      setInput({ type: "insertValue", field: e.target.name, fieldValue: e.target.value });
    }

      const submitHandler = (e) => {
        e.preventDefault()
        setErrors({});
        setButtonLoading(true)
        return axios.post("/updateProfile", input)
        .then(res => {
          let modalContent = {
            open: true,
            message: res.data.message,
            successLink: "",
            successLinkText: '',
            cancelText: 'okay'
            }
            setButtonLoading(false)
            consumeContext.setModal({ type: "open", modalContent: modalContent })
            return setRerender(prevState => prevState + 1)
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
        <div className="container pageComponents">
             {
            consumeContext.authState.state ?
            <React.Fragment>
          { !consumeContext.authState.disabled ?
            <React.Fragment>
          {consumeContext.authState.emailVerified ?
          <div className={classes.paperWrapper}>
            <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            Update Profile
          </Typography>
          <form
            autoComplete="off"
            method="POST"
            name="updateProfileForm"
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
                disabled={true}
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
              <TextField
               className={clsx(classes.spaceField, classes.field)}
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
              className={clsx(classes.spaceField, classes.field)}
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
                  Update
                </Typography>
              </Button>
            </div>
          </form>
            </Paper>
        </div>
        : 
        <Typography color="error" 
        className={clsx(classes.boldText, classes.errorText)}
        >
        {errors && errors.notVerified}
        </Typography>
        }
        </React.Fragment>
        :
        <Typography 
        className={clsx(classes.boldText, classes.errorText)}
         variant="body2" color="error"
         >
          {!consumeContext.authState.initializing &&
          "Your account has been disabled, contact support team"
          }
        </Typography>
        }
        </React.Fragment>
        :
        <Typography 
        className={clsx(classes.boldText, classes.errorText)}
         variant="body2" color="error"
         >
         {(!consumeContext.authState.initializing && errors) && errors.notAuthenticated}
         {!consumeContext.authState.initializing && (
           <Link to="/login" >
             login again
           </Link>
         )}
        </Typography>
      }
       {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
        </div>
    )
}

export default SignUp
