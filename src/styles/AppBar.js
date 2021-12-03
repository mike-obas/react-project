import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grow: { 
      padding: "0px 0px 5px",
      flexGrow: 1,
      marginBottom: '13px'
    },
    appBarContainer: { 
      padding: "5px 0px",
      boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.common.white,
        //padding: '1px 0px',
        [theme.breakpoints.down('sm')]: {
          padding: 0
        },
      },
      toolbar: {
         padding: 0,
      },
      navBtn: {
         marginLeft: '2px',
         [theme.breakpoints.down('md')]: {
          margin: 0,
        }
      },
      navContainer: {
        padding: "0px 0px 0px 5px",
        margin: "auto",
        [theme.breakpoints.down('md')]: {
          padding: "0px 5px",
        }
      },
      iconWidth: {
        fontSize: '1.6rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '2.25rem',
        }
      },
      siteLogo: {
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
        width: '70px',
        [theme.breakpoints.up('sm')]: {
            width: '100px'
          },
        '& img': {
          width: '100%',
          height: '100%',
        },
        [theme.breakpoints.down('xs')]: {
          marginLeft: '7px',
        },
      },
    search: {
      padding: "0px 2px 0px 6px",
      marginLeft: "10px",
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        backgroundColor: fade('#eeeeee', 0.7),
      },
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
    },
    button: {
      textTransform: "capitalize",
      backgroundColor: '#ff931e',
      display: 'flex',
      textAlign: 'right',
      wrap: 'nowrap',
      padding: theme.spacing(1, 3),
      height: '100%',
      '&:hover': {
        backgroundColor: '#e67700',
      },
      boxShadow: theme.shadows[2]
    },
    navLink: {
      textDecoration: "none"
    },
    inputRoot: {
      color: '#424242',
      width: '100%',
      padding: theme.spacing(0.7, 3, 0.7, 1),
    },
  cartAvater: {
    width: theme.spacing(2),
      height: theme.spacing(2),
    fontSize: '10px',
    backgroundColor: 'black',
  },
    hideFrmMobile: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    hideFrmDesktop: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

  export default useStyles;