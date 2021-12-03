import React, { useEffect, useState } from "react";
import CleanUpLoader from "../../utils/CleanUpLoader";
import axios from "../../axiosConfig";
import useStyles from "../../styles/ProductUpload";
import { Button, Typography, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "../../components/CircularProgress";
import clsx from "clsx";
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import {Link} from 'react-router-dom'

function Promo() {
  CleanUpLoader();
  const classes = useStyles();
  const consumeModalContext = useContext(UseContext);
  const consumeContext = useContext(UseContext);
  const initialInput = {
    type: "registration",
    promoAmount: "",
    minOrderAmount: "",
  };
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
    axios
      .get(`/singleQuery/promo/registration`)
      .then((res) => {
        if (cancel) return;
        if(Object.keys(res.data).length > 0){
            return setInput({ ...input, ...res.data });
        }
        else{
            return setInput(input);
        }
      })
      .catch();

    return () => { cancel = true; };
    // eslint-disable-next-line
  }, []);

  const formHandler = (e) => {
    setErrors({ ...errors, [e.target.name]: undefined });
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    axios.post("/registrationPromo", input)
      .then((res) => {
        setButtonLoading(false);
        let modalContent = {
            open: true,
            message: res.data.message,
            successLink: ``,
            successLinkText: '',
            cancelText: 'Okay'
          };
          return consumeModalContext.setModal({ type: "open", modalContent: modalContent })
      })
      .catch((err) => {
        setErrors(err.response.data);
        setButtonLoading(false);
      });
  };

  const type = [
    {
      value: "registration",
      label: "Registration",
    }, 
]

  return (<div className="container pageComponents">
    {consumeContext.authState.state ? (
        <React.Fragment>
          {!consumeContext.authState.disabled ? (
            <React.Fragment>
              {consumeContext.authState.role === "administrator" ||
              consumeContext.authState.role === "staff" ? (
  <div className={classes.paperWrapper}>
    <Paper className={classes.mainContainer}>
    <Typography variant="h5" className={classes.heading}>
    Allocate Promo
  </Typography>
  <form
    autoComplete="off"
    method="POST"
    name="promoForm"
    noValidate
    encType="multipart/form-data"
  >

        <TextField
               className={clsx(classes.field)}
                select
                label="type"
                name="type"
                value={input.type}
                margin="normal"
                onChange={formHandler}
                variant="outlined"
                size="small"
              >
                {type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
      <TextField
        error={errors.promoAmount && true}
        helperText={errors.promoAmount ? errors.promoAmount : 'Discount amount for every first order of a registered customer'}
        label="Promo Amount"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        name="promoAmount"
        value={input.promoAmount}
        onChange={formHandler}
      /> 
      <TextField
        error={errors.minOrderAmount && true}
        helperText={errors.minOrderAmount ? errors.minOrderAmount : 'Discount amount will only be applied when orders exceed or equals this amount'}
        label="Minimum Order Amount"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        name="minOrderAmount"
        value={input.minOrderAmount}
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
        Change values as desired to update promo, or leave it empty.
      </Typography>
    </div>
  </form>
    </Paper>
</div>
) : (
  <Typography style={{ padding: 40 }} />
)}
</React.Fragment>
) : (
<Typography style={{ padding: 40 }} variant="body2" color="error">
{!consumeContext.authState.initializing &&
  "Your account has been disabled, contact support team"}
</Typography>
)}
</React.Fragment>
) : (
<Typography style={{ padding: 40 }} variant="body2" color="error">
{!consumeContext.authState.initializing && "session timed out "}
{!consumeContext.authState.initializing && (
<Link to="/resume">login again</Link>
)}
</Typography>
)}
{consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
</div>
);
}

export default Promo;
