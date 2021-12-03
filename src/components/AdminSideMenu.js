import React, {useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import ShopTwoOutlinedIcon from '@material-ui/icons/ShopTwoOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import DonutLargeOutlinedIcon from '@material-ui/icons/DonutLargeOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import StyleRoundedIcon from '@material-ui/icons/StyleRounded';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PageLoaderHandler from '../utils/PageLoaderHandler'
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
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
                type: "setAdminAuthState",
                field: "state",
                fieldValue: true
            });
            axios.get(`/singleQuery/adminUsers/${uid}`)
            .then(res => {
                if (cancel) return;
                consumeContext.setAuthState({
                    type: "setAdminAuthState", 
                    field: "name",
                    fieldValue: res.data.name
                });
                consumeContext.setAuthState({
                    type: "setAdminAuthState", 
                    field: "role",
                    fieldValue: res.data.role
                });
                consumeContext.setAuthState({
                    type: "setAdminAuthState",
                    field: "initializing",
                    fieldValue: false
                });
            })
            .catch();
          } 
          else if (user && user.disabled) {
            consumeContext.setAuthState({
                type: "setAdminAuthState",
                field: "disabled",
                fieldValue: true
            });
            consumeContext.setAuthState({
                type: "setAdminAuthState",
                field: "initializing",
                fieldValue: false
            });
            }
          else {
            consumeContext.setAuthState({
                type: "setAdminAuthState",
                field: "state",
                fieldValue: false
            });
            consumeContext.setAuthState({
                type: "setAdminAuthState",
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
            <VerifiedUserOutlinedIcon color="primary" />
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
            text: 'Customers',
            link: 'customers',
            icon: <PeopleAltOutlinedIcon />
          },
        {
          text: 'Orders',
          link: 'orders',
          icon: <LocalMallOutlinedIcon />
        },
        {
            text: 'Product Upload',
            link: 'product_upload',
            icon: <PublishOutlinedIcon />
          },
          {
            text: 'Manage Products',
            link: 'products',
            icon: <ShopTwoOutlinedIcon />
          },
          {
            text: 'Feedback',
            link: 'reviews',
            icon: <FeedbackOutlinedIcon />
          },
          {
            text: 'Pre Order Items',
            link: 'admin_preorder',
            icon: <StyleRoundedIcon />
          }
      ].map((category) => (
        <ListItem 
        button key={category.link}
        component={NavLink} to={`/admin/${category.link}`}
        className="routerLink"
        activeStyle={active}
        onClick={triggerPageLoader}
        >
          { category.icon }
           <Typography variant='subtitle1' className={classes.listText} >
           {category.text}
           </Typography>
        </ListItem>
        ))}
       { ( !consumeContext.authState.initializing && 
              consumeContext.authState.role === "administrator")
              &&
       <div>

<ListItem 
        button
        component={NavLink} to="/admin/promo"
        className="routerLink"
        activeStyle={active}
        onClick={triggerPageLoader}
        >
         <DonutLargeOutlinedIcon />
           <Typography variant='subtitle1' className={classes.listText} >
        Promo
           </Typography>
        </ListItem>

           <ListItem 
        button
        component={NavLink} to="/admin/create_admin_user"
        className="routerLink"
        activeStyle={active}
        onClick={triggerPageLoader}
        >
         <PersonAddOutlinedIcon />
           <Typography variant='subtitle1' className={classes.listText} >
           Create Admin
           </Typography>
        </ListItem>

        <ListItem 
        button
        component={NavLink} to="/admin/admin_users"
        className="routerLink"
        activeStyle={active}
        onClick={triggerPageLoader}
        >
         <PersonOutlineIcon />
           <Typography variant='subtitle1' className={classes.listText} >
        Admin Users
           </Typography>
        </ListItem>

        </div>
        }
        <ListItem 
        button
        component={NavLink} to="/admin/logout"
        className="routerLink"
        activeStyle={active}
        onClick={triggerPageLoader}
        >
         <ExitToAppOutlinedIcon />
           <Typography variant='subtitle1' className={classes.listText} >
        Logout
           </Typography>
        </ListItem>
        
    </div>
  ); 
  return (
      <div>
    {
        (!consumeContext.authState.initializing && 
        consumeContext.authState.state &&
        !consumeContext.authState.disabled &&
        (consumeContext.authState.role === "administrator" || 
        consumeContext.authState.role === "staff"))
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