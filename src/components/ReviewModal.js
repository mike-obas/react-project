import React, { Fragment, useState, useReducer } from "react";
import { Button, Grid, Typography, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateIcon from "@material-ui/icons/Create";
import Rating from "@material-ui/lab/Rating";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from '../axiosConfig';
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import CircularProgress from "./CircularProgress";

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    fontWeight: 700,
  },
  submitButton: {
    width: "95%",
    margin: "0px auto 15px",
  },
  submitText: {
    color: "#ffffff",
  },
  ratingContainer: {
    margin: "5px 0px 0px",
  },
}));

const initialError = {};
const reducer = (state, action) => {
  switch (action.type) {
    case "provideError":
      return { ...state, [action.fieldValue]: "must not be empty" };
      case "provideLengthError":
      return { ...state, [action.fieldValue]: "maximum word-length is 250" };
      case "serverSideError":
      return { ...state, ...action.errorObject };
    case "removeError":
      const recentErrors = { ...state };
      action.fieldValue && delete recentErrors[action.fieldValue];
      return recentErrors;
    default:
      return state;
  }
};

export default function FormDialog(props) {
  const consumeContext = useContext(UseContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { icon } = props;
  const { category, productId, resolvedUrlName } = useParams();
  const initialInput = {
    category,
    productId,
    resolvedUrlName,
    name: "",
    email: "",
    rating: null,
    comment: "",
  };
  const [input, setInput] = useState(initialInput);
  const [errors, dispatch] = useReducer(reducer, initialError);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    dispatch({ type: "removeError", fieldValue: e.target.name });
  };
  const ratingHandler = (e) => {
    setInput({ ...input, [e.target.name]: Number(e.target.value) });
    dispatch({ type: "removeError", fieldValue: e.target.name });
  };
  const submitHandler = () => {
    setButtonLoading(true);
    const inputNames = ["name", "email", "rating", "comment"];
    const form = document.forms["reviewForm"];
    let checkStatus = []
    const promises = new Promise((resolve, reject) => {
      inputNames.forEach((inputName, index, inputNames) => {
        if(!form[inputName].value) 
          {
          checkStatus.push(index)
          dispatch({ type: "provideError", fieldValue: inputName });
        }
        else if(inputName === 'comment' && form[inputName].value.length > 250 ){
          checkStatus.push(index)
          dispatch({ type: "provideLengthError", fieldValue: inputName });
        }
        (index === inputNames.length - 1) && resolve()
      });
    });
    promises.then(() => {
      if(Object.keys(errors).length === 0 && checkStatus.length === 0) 
      {
        axios.post("/addReview", input)
        .then(res => {
          let modalContent = {
            open: true,
            message: res.data.generalMessage,
            successLink: category,
            successLinkText: `explore`,
            cancelText: 'Continue shopping'
          };
          //localStorage.removeItem("imagesForUpload")
          setInput(initialInput);
          setButtonLoading(false);
          consumeContext.countDispatch("increment");
          handleClose()
          return consumeContext.setModal({ type: "open", modalContent: modalContent })
        })
        .catch(err => {
          dispatch({ type: "serverSideError", errorObject: err.response.data })
          setButtonLoading(false); 
        }
           )
      // console.log(input);
      //
    }
    else{setButtonLoading(false);}
    })
  };

  return (
    <Fragment>
      {icon === "bigIcon" ? (
        <IconButton onClick={handleClickOpen}>
          <CreateIcon fontSize="default" />
        </IconButton>
      ) : (
        <IconButton onClick={handleClickOpen} style={{ padding: 0 }}>
          <CreateIcon fontSize="small" />
        </IconButton>
      )}

      <Dialog
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="review-form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" component="div" className={classes.heading}>
            Add your review
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form autoComplete="off" method="POST" name="reviewForm" noValidate>
            <div>
              <TextField
                error={errors.name && true}
                helperText={errors.name && errors.name}
                label="name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={input.name}
                onChange={formHandler}
              />
              <TextField
                error={errors.email && true}
                helperText={errors.email && errors.email}
                label="email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={input.email}
                onChange={formHandler}
              />
            </div>
            <div className={classes.ratingContainer}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Rating:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Rating
                    name="rating"
                    value={input.rating}
                    onChange={ratingHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="error">
                    {errors.rating && errors.rating}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div>
              <TextField
                error={errors.comment && true}
                helperText={errors.comment && errors.comment}
                label="comment"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                name="comment"
                value={input.comment}
                onChange={formHandler}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions className={classes.submitButton}>
        <Typography variant="caption" color="error">
                {errors.generalError && errors.generalError}
              </Typography>
          <Button
            onClick={submitHandler}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            type="submit"
            disabled={buttonLoading}
          >
            {buttonLoading && (
                  <CircularProgress
                  />
                )}
            <Typography variant="subtitle1" className={classes.submitText}>
              Submit
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
