import React from 'react';
import useStyles from '../styles/AppBar';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DesktopCategory from './DesktopCategory';

 function HoverCategory() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
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
            
        <IconButton  
            edge="start"
            className={`${classes.button} ${classes.menuButton}`}
            color="inherit"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{background: 'none', boxShadow: 'none'}}
          >
            <MenuIcon className={classes.iconWidth} />
          </IconButton>

          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 10000}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                  <div>
                    <MenuList role='menu' autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                      <div 
                      style={{width: '250px', marginTop: '-20px', display: 'flex'}}
                      >
                    <Grid 
                    container 
                    alignItems='center'
                    >
                    <Grid
                    item style={{width: '100%'}}
                     className={classes.hideFrmMobile}
                     onClick={handleClose}
                     >
                    <DesktopCategory menuClickCategory={true} />
                    </Grid>
                    </Grid>
                          </div>
                          </MenuItem>
                    </MenuList>
                  </div>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
  export default HoverCategory;