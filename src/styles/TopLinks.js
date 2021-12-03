import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
        paddingTop: '10px'
    },
    secondRoot: {
        flexGrow: 1,
        paddingTop: '4px',
        [theme.breakpoints.up('md')]: {
            display: 'none'
          },
    },
    avatar: {
        backgroundColor: '#e67700',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            margin: '3px auto'
          }
      },
     tealAvatar: {
        backgroundColor: 'teal'
     },
      spaceEachLink: {
          paddingRight: '4px',
          [theme.breakpoints.up('sm')]: {
            paddingRight: '10px'
          }
      },
      linkContainer: {
        padding: '5px 10px',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            padding: '5px 2px',
            boxShadow: 'none'
          }
      },
      linkText: {
        color: '#000',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2vw'
          },
          [theme.breakpoints.down('xs')]: {
            fontSize: '12px'
          }
      }
}));
export default useStyles;