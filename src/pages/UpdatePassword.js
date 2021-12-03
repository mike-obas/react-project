import React from "react";
import { useEffect, useReducer, useState } from "react";
import useStyles from '../styles/ProductUpload'
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import jwtDecode from "jwt-decode";
import { Button, Typography, Paper } from "@material-ui/core";
import CircularProgress from "../components/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import FormHelperText from "@material-ui/core/FormHelperText";
import CleanUpLoader from "../utils/CleanUpLoader";

const initialInput = {
  uid: "",
  password: "",
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

function UpdatePassword() {
  CleanUpLoader()
    const initialError = {}
  const consumeContext = useContext(UseContext);
  const { token } = useParams();
  const classes = useStyles();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [input, setInput] = useReducer(reducer, initialInput);
  const [errors, setErrors] = useState(initialError);

  useEffect(() => {
    let cancel = false;
    let decoded = jwtDecode(token);
    if (token && (decoded.exp * 1000) > Date.now()) {
      if (cancel) return;
      return setInput({
        type: "insertValue",
        field: "uid",
        fieldValue: decoded.uid,
      });
    } else {
      if (cancel) return;
      let modalContent = {
        open: true,
        message: "Your password reset token has expired, kindly request for another one.",
        successLink: "change_password",
        successLinkText: "okay",
        cancelText: "",
        errorIcon: true,
      };
        consumeContext.setModal({
        type: "open",
        modalContent: modalContent,
      })
    }
    return () => { cancel = true; };
    // eslint-disable-next-line
  }, []);

  const handlePassword = (prop) => (event) => {
    setInput({
      type: "insertValue",
      field: prop,
      fieldValue: event.target.value,
    });
    setErrors({ ...errors, [prop]: undefined });
  };

  const handleClickShowPassword = () => {
    setInput({
      type: "insertValue",
      field: "showPassword",
      fieldValue: !input.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors({});
    setButtonLoading(true);
    axios
      .post("/updatePassword", input)
      .then((res) => {
        let modalContent = {
          open: true,
          message: res.data.message,
          successLink: "login",
          successLinkText: "okay",
          cancelText: "",
        };
        return consumeContext.setModal({
          type: "open",
          modalContent: modalContent,
        });
      })
      .catch((err) => {
        let modalContent = {
          open: true,
          message: err.response.data.error,
          successLink: "login",
          successLinkText: "okay",
          cancelText: "",
          errorIcon: true,
        };
        return consumeContext.setModal({
          type: "open",
          modalContent: modalContent,
        });
      });
  };

  return (
    <div>
      <div className="container pageComponents">
        <div className={classes.paperWrapper}>
          <Paper className={classes.mainContainer}>
            <Typography variant="h5" className={classes.heading}>
            New Password
            </Typography>
            <form
              autoComplete="off"
              method="POST"
              name="passwordUpdateForm"
              noValidate
              encType="multipart/form-data"
            >
              <FormControl
                variant="outlined"
                className={clsx(classes.spaceField, classes.field)}
                size="small"
                error={errors.password && true}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={input.showPassword ? "text" : "password"}
                  value={input.password}
                  onChange={handlePassword("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {input.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
                  {buttonLoading && <CircularProgress />}
                  <Typography
                    variant="subtitle1"
                    className={classes.submitText}
                  >
                    Submit
                  </Typography>
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;