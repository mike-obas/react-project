import React, { useState, useEffect, useReducer } from 'react'
import useStyles from '../styles/ProductUpload'
import {
    Button,
    Typography,
    Paper
  } from "@material-ui/core";
  import TextField from "@material-ui/core/TextField";
  import CircularProgress from "../components/CircularProgress";
  import { useContext } from "react";
  import { UseContext } from "../utils/UseContext";
import CleanUpLoader from "../utils/CleanUpLoader"
import axios from '../axiosConfig'
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
  
function ChangePassword() {
      const initialError = {}
    const classes = useStyles()
    const consumeContext = useContext(UseContext);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [input, setInput] = useReducer(reducer, initialInput);
    const [errors, setErrors] = useState(initialError);
    CleanUpLoader()
    useEffect(() => {
      let cancel = false;
  firebase.auth().onAuthStateChanged((user) => {
      if (cancel) return;
      if (user && !user.disabled) { 
        setInput({ type: "insertValue", field: "email", fieldValue: user.email });
      }
      else{}
      });
      return () => {cancel = true }
      }, [])


    const formHandler = (e) => {
      setErrors({...errors, [e.target.name]: undefined});
      setInput({ 
        type: "insertValue", 
        field: e.target.name, 
        fieldValue: e.target.value 
      });
    }

      const submitHandler = (e) => {
        firebase.auth().signOut();
        e.preventDefault()
        setErrors({});
        setButtonLoading(true)
        axios.post("/resetPassword", {email: input.email})
        .then((res) => {
            setButtonLoading(false)
            setInput({ type: "removeValue"});
            let modalContent = {
                open: true,
                message: res.data.message,
                successLink: "login",
                successLinkText: 'okay',
                cancelText: ''
                }
                return consumeContext.setModal({ type: "open", modalContent: modalContent })
          })
        .catch((err) => {
            setErrors(err.response.data);
           setButtonLoading(false);
        });

      }


    return (
        <div className="container pageComponents">
          <div className={classes.paperWrapper}>
            <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            Reset Password
          </Typography>
          <form
            autoComplete="off"
            method="POST"
            name="passwordResetForm"
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
        </div>
        </div>
    )
}

export default ChangePassword
