import React from 'react';
import useStyles from '../styles/AppBar';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Button, Grid } from '@material-ui/core';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom'
import PageLoaderHandler from '../utils/PageLoaderHandler'
 
 function MenuListComposition() {
    const triggerPageLoader = PageLoaderHandler()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const active = {
      backgroundColor: '#e67700'
   }
   const activeMenu = {
    backgroundColor: "#f2f2f2"
  }

    const handleToggle = (e) => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
    return (
      <div className={classes.root}>   
        <div>
            <Button 
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}

            className={classes.button} style={{backgroundColor: "#e6e6e6"}}>
            <PermIdentityOutlinedIcon style={{marginBottom: '5px'}} />&nbsp;
          <Typography variant='body2'>Login</Typography> &nbsp;
          <ExpandMoreOutlinedIcon />
           </Button>

          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 10000}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}  >
                      <MenuItem onClick={handleClose} >
                          <Button component={NavLink} to="/login"
                          activeStyle={active}
                           className={classes.button}
                            style={{width: '100%'}}
                            onClick={triggerPageLoader}
                            > 
                          LOGIN
                          </Button>
                          </MenuItem>                        
                      <Grid 
                      container
                      spacing={2} 
                      
                      alignItems='center'
                      style={{padding: '15px 5px 10px 5px'}}
                      >
                        <Grid  item xs={5}><hr></hr></Grid>  
                          <Grid style={{padding: '4px'}}
                          item xs={2}
                          >
                            <Typography variant='body2'>OR</Typography>
                            </Grid> 
                          <Grid  item xs={5}><hr></hr></Grid> 
                      </Grid>
                      <MenuItem 
                      component={NavLink} to="/signup"
                      activeStyle={activeMenu}
                       onClick={triggerPageLoader}
                       >
                        <Typography 
                        variant="body2" 
                        color='primary'
                        onClick={handleClose}
                        >
                        CREATE AN ACCOUNT
                        </Typography>
                          </MenuItem>

                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }

  export default MenuListComposition;