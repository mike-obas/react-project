import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useContext } from 'react'
import {UseContext} from "./UseContext"
import { Grid, Typography } from '@material-ui/core';
import useStyles from '../styles/SearchModal'
import SearchProducts from './SearchProducts'
import AdminProducts from './AdminProducts'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ScrollDialog() {
  const classes = useStyles()
  const consumeContext = useContext(UseContext)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(consumeContext.searchModal.open)
    return () => {}
  }, [consumeContext.searchModal.open])

  const handleClose = () => {
    consumeContext.setSearchModal({ type: "close"})
    setOpen(false);
  };  

  const { searchResults, noMatch, adminArea } = consumeContext.searchModal

  const searchedProducts = searchResults && !adminArea ? 
  (searchResults.map(result => 
    <SearchProducts product={result} key={result.createdAt}/>
    )) : ''

  const adminSearchedProducts = adminArea && searchResults ? 
  (searchResults.map(result => 
    <AdminProducts product={result} key={result.createdAt}/>
    )) : ''

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const fullScreen = useMediaQuery(theme.breakpoints.down(600));
    const dialogStyle = {
      top: matches ? 10 : 50,
      zIndex: 1000,
    }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-describedby="scrollable-search-content"
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        style={dialogStyle}
      >
        <DialogContent className={classes.dialogContent}>

        <Grid 
        className={classes.searchItemContainer}
        container
        spacing={2}
        >
          {
          searchedProducts ? searchedProducts : 
          <Typography className={classes.emptyModal} color="textSecondary">
            {noMatch && noMatch}
          </Typography>
          }
          {
            adminSearchedProducts ? adminSearchedProducts :
            <Typography className={classes.emptyModal} color="textSecondary">
            </Typography>
          }
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
