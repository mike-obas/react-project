import React, {useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingBasketOutlined from '@material-ui/icons/ShoppingBasketOutlined';
import PageLoaderHandler from '../utils/PageLoaderHandler'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import firebase from 'firebase/app'
import axios from '../axiosConfig'
import 'firebase/auth'


const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
    color: '#424242'
  },
  fullList: {
    width: 'auto',
  },
  siteLogo: {
    display: 'flex',
    padding: '5px 0px',
    margin: 'auto',
    width: '30%',
    height: '30%',
    justify: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      objectFit: 'contain',
    }
  },
  listHeading: {
    fontWeight: 700,
    marginBottom: '-10px',
    color: '#e67700'
  },
  listText: {
    padding: '5px 0px 0px 10px'
  },
  successText: {
      fontWeight: 700,
color: 'green', 
  textTransform: 'capitalize'
}
}));
export default function SwipeableTemporaryDrawer(iconType) {
const consumeContext = useContext(UseContext);

useEffect(() => {
    let cancel = false;
    firebase.auth().onAuthStateChanged((user) => {
        if (cancel) return;
        if (user && !user.disabled) {
            let uid = user.uid;
            consumeContext.setAuthState({
                type: "setUserAuthState",
                field: "state",
                fieldValue: true
            });
            axios.get(`/singleQuery/users/${uid}`)
            .then(res => {
                if (cancel) return;
                consumeContext.setAuthState({
                    type: "setUserAuthState", 
                    field: "name",
                    fieldValue: `${res.data.firstName} ${res.data.surname}`
                });
                consumeContext.setAuthState({
                    type: "setUserAuthState",
                    field: "initializing",
                    fieldValue: false
                });
            })
            .catch();
          } 
          else {
            consumeContext.setAuthState({
                type: "setUserAuthState",
                field: "state",
                fieldValue: false
            });
            consumeContext.setAuthState({
                type: "setUserAuthState",
                field: "initializing",
                fieldValue: false
            });
          }
          if(user && user.emailVerified){
            consumeContext.setAuthState({
              type: "setUserAuthState",
              field: "emailVerified",
              fieldValue: true
          });
          }
          if (user && user.disabled) {
            consumeContext.setAuthState({
                type: "setUserAuthState",
                field: "disabled",
                fieldValue: true
            });
            consumeContext.setAuthState({
                type: "setUserAuthState",
                field: "initializing",
                fieldValue: false
            });
            }
          
        })
    return () => { cancel = true; }
    // eslint-disable-next-line
}, [])

  const triggerPageLoader = PageLoaderHandler()
  const active = {
    backgroundColor: '#eeeeee'
 }
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem 
          button
          component={Link} to='/'
          className="routerLink"
          onClick={triggerPageLoader}
          >
            <div className={classes.siteLogo}>
            <img src='/images/ntek.png' alt='NTEK LOGO' />
          </div>
          </ListItem>
          <Divider />
          <ListItem>
            <PersonOutlineOutlinedIcon color="primary" />
            <Typography variant='subtitle1' className={clsx(
                classes.listText, classes.successText
                )} 
                >
              {
              !consumeContext.authState.initializing && 
              consumeContext.authState.name}
              </Typography>
            </ListItem>
            <Divider />
        {[
         {
            text: 'Dashboard',
            link: '/user/user_dashboard',
            icon: <AccountBoxOutlinedIcon />
          },
        {
          text: 'My Orders',
          link: '/user/user_orders',
          icon: <ShoppingBasketOutlined />
        },
        {
            text: 'Manage Password',
            link: '/change_password',
            icon: <VpnKeyOutlinedIcon />
          },
          {
            text: 'Update Profile',
            link: '/user/profile_update',
            icon: <EditOutlinedIcon />
          },
          {
            text: 'Logout',
            link: '/user/logout',
            icon: <ExitToAppOutlinedIcon />
          }
      ].map((component) => (
        <ListItem 
        button key={component.link}
        component={NavLink} to={`${component.link}`}
        className="routerLink"
        activeStyle={active}
        onClick={triggerPageLoader}
        >
          { component.icon }
           <Typography variant='subtitle1' className={classes.listText} >
           {component.text}
           </Typography>
        </ListItem>
        ))}
    </div>
  ); 

  return (
      <div>
    {
        (!consumeContext.authState.initializing && 
        consumeContext.authState.state &&
        !consumeContext.authState.disabled &&
        consumeContext.authState.emailVerified &&
        consumeContext.authState.role === "" )
        &&
        <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {
            iconType.iconType ? <MoreHorizRoundedIcon
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(anchor, true)}
             /> : 
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon  fontWeight='bold' className={classes.iconWidth} />
            </IconButton>
            
          }
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>}
    </div>
  );
}