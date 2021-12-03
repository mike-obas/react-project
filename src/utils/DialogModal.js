import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useContext } from 'react'
import {UseContext} from "./UseContext"

function DialogModal() {
  const [open, setOpen] = React.useState(false);
  const consumeContext = useContext(UseContext)

  useEffect(() => {
    setOpen(consumeContext.dialog.open)
    return () => {}
  }, [consumeContext.dialog.open])

  const { message, actionText, cancelText } = consumeContext.dialog

  const handleClose = () => {
    consumeContext.setDialog({ type: "close"})
    setOpen(false);
  };  
  
  const handleAction = () => {
      const values = {
        open: false,
        performAction: true,
        message: '',
        actionText: '',
        cancelText: ''
      }
      //setOpen(false);
    return consumeContext.setDialog({ type: "open", modalContent: values})
  }

  return (
    <div>
      <Dialog
      disablePortal
      disableEnforceFocus
      disableAutoFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText 
          id="alert-dialog-description"
          style={{color: 'red'}}
          >
           {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            {cancelText}
          </Button>
          <Button onClick={handleAction} color="primary" autoFocus>
            {actionText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DialogModal