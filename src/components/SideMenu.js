import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import MailIcon from '@material-ui/icons/Mail';
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import SpeakerRoundedIcon from '@material-ui/icons/SpeakerRounded';
import SpeakerGroupRoundedIcon from '@material-ui/icons/SpeakerGroupRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import WbIncandescentRoundedIcon from '@material-ui/icons/WbIncandescentRounded';
import OutdoorGrillRoundedIcon from '@material-ui/icons/OutdoorGrillRounded';
import FireplaceRoundedIcon from '@material-ui/icons/FireplaceRounded';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TableChartIcon from '@material-ui/icons/TableChart';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PageLoaderHandler from '../utils/PageLoaderHandler'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CallIcon from '@material-ui/icons/Call';

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
  }
}));
export default function SwipeableTemporaryDrawer(iconType) {
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
          <ListItem
           component={NavLink} to='/login'
           className="routerLink"
           activeStyle={active}
           onClick={triggerPageLoader}
          >
            <PermIdentityOutlinedIcon/>
            <Typography variant='subtitle1' className={classes.listText} >
              My Account
              </Typography>
            </ListItem>
            <Divider />
        <ListItem>
          <Typography 
          variant='caption' 
          className={classes.listHeading} 
          style={{paddingBottom: '10px'}}>
          BRANDS
          </Typography>
          </ListItem>
        {[
        {
          text: 'Eltak',
          link: 'eltak',
          icon: <SpeakerGroupRoundedIcon />
        },
        {
          text: 'Lentz',
          link: 'lentz',
          icon: <KitchenRoundedIcon />
        }
      ].map((category) => (
        <ListItem 
        button key={category.link}
        component={NavLink} to={`/${category.link}`}
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
          <Divider />
          <ListItem>
          <Typography variant='caption' className={classes.listHeading}>
          CATEGORIES
          </Typography>
          </ListItem>
      <List>
        {[
          {
          text: 'Televisions',
          link: 'televisions',
          icon: <LiveTvRoundedIcon />
        }, 
        {
          text: 'Musical System',
          link: 'musical_system',
          icon: <MusicNoteRoundedIcon />
        }, 
        {
          text: 'Refrigerators',
          link: 'refrigerators',
          icon: <KitchenRoundedIcon />
        }, 
        {
          text: 'Home theatre',
          link: 'home_theatre',
          icon: <SpeakerRoundedIcon />
        },
        {
          text: 'Public Address System',
          link: 'public_address_system',
          icon: <SpeakerGroupRoundedIcon />
        },
        {
          text: 'Solar System',
          link: 'solar_system',
          icon: <WbIncandescentRoundedIcon />
        },
        {
          text: 'Commercial Oven',
          link: 'commercial_oven',
          icon: <FireplaceRoundedIcon />
        },
        {
          text: 'Commercial Cookers',
          link: 'commercial_cookers',
          icon: <OutdoorGrillRoundedIcon />
        },
        {
          text: 'Microwave Oven',
          link: 'microwave_oven',
          icon: <FireplaceRoundedIcon />
        },
        {
          text: 'Blenders',
          link: 'blenders',
          icon: <LocalDrinkIcon />
        },
        {
          text: 'Deep Fryers',
          link: 'deep_fryers',
          icon: <FireplaceRoundedIcon />
        },
        {
          text: 'Mixers',
          link: 'mixers',
          icon: <LocalDrinkIcon />
        },
        {
          text: 'Work Tables',
          link: 'work_tables',
          icon: <TableChartIcon />
        },
        {
          text: 'Kitchen Rack',
          link: 'kitchen_rack',
          icon: <DeveloperBoardIcon />
        }
      ].map((category) => (
          <ListItem 
          button key={category.link}
          component={NavLink} to={`/${category.link}`}
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
      </List>
      <Divider />
      <List>
        {[
        {
          text: 'Contact us',
          link: 'mailto: support@ntek.ng',
          icon: <MailIcon />
        },
        {
          text: 'Facebook',
          link: 'https://www.facebook.com/100068328626248',
          icon: <FacebookIcon />
        },
        {
          text: 'Instagram',
          link: 'https://www.instagram.com/ntek.ng',
          icon: <InstagramIcon />
        },
        {
          text: '08101463724',
          link: 'https://wa.me/+2348101463724',
          icon: <WhatsAppIcon />
        },
        {
          text: '08101463724',
          link: 'tel: +2348101463724',
          icon: <CallIcon />
        }
      ].map((category) => (
        <ListItem 
        button key={category.link}
        className="routerLink"
        >
          { category.icon }
           <Typography variant='subtitle1' className={classes.listText} >
           <a 
                href={`${category.link}`}
                className="routerLink"
                >
                  {category.text}
                  </a>
           </Typography>
        </ListItem>
        ))}       
      </List>
    </div>
  ); 
  return (
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
    </div>
  );
}