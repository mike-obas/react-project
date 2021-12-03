import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Grid, IconButton } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import { useContext } from 'react'
import {UseContext} from "./UseContext"
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles((theme) => ({
  contentText: {
    color: '#000000'
  },
  iconContainer: {
   textAlign: 'center',
   marginTop: '20px'
  },
  succesIcon: {
    fontSize: '80px',
    color: '#e67700'
  },
  errorIcon: {
    fontSize: '80px',
    color: 'red'
  },
  buttonContainer: {
    width: '70%',
    margin: '0px auto 20px'
  },
  actionButton: {
    margin: '5px 0px'
  }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  function AlertModal() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const consumeContext = useContext(UseContext)
  useEffect(() => {
    setOpen(consumeContext.modal.open)
  
    return () => {}
  }, [consumeContext.modal.open])
  
  const { message, successLink, successLinkText, cancelText, errorIcon } = 
  consumeContext.modal
  
    const handleClose = () => {
      consumeContext.setModal({ type: "close"})
      setOpen(false);
    };
  
    return (
      <div>
        {/* <Button id='alertModal' variant="outlined" color="primary" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> */}
        <Dialog
        disablePortal
        disableEnforceFocus
        disableAutoFocus
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={classes.modalWrapper}
        >
              <div className={classes.iconContainer}>
            { errorIcon ?
            (<IconButton style={{padding: 0}}>
            <CancelOutlinedIcon className={classes.errorIcon} />
            </IconButton>) :
              (<IconButton style={{padding: 0}}>
              <CheckCircleOutlinedIcon className={classes.succesIcon} />
            </IconButton>)
            }
            </div>
          <DialogContent>
            <DialogContentText 
            id="alert-dialog-slide-description"
            className={classes.contentText}
            >
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.buttonContainer}>
            <Grid container>

            { successLink !== '' &&
              <Grid item xs={12}>
            <Button 
            onClick={handleClose} 
            variant="contained"
            color="primary"
            component={Link}
            to={`/${successLink}`}
            fullWidth
            className={classes.actionButton}
            disableElevation
            >
              {successLinkText}
            </Button>
            </Grid>}

            { cancelText !== '' &&
            <Grid item xs={12}>
            <Button 
            onClick={handleClose} 
            color="primary"
            variant="outlined"
            fullWidth
            className={classes.actionButton}
            >
              {cancelText}
            </Button>
            </Grid>}

            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default AlertModal
