import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from '../styles/AppBar';

function menuIcon() {
    const classes = useStyles();
    return (
        <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon  fontWeight='bold' className={classes.iconWidth} />
      </IconButton>
    )
}

export default menuIcon
