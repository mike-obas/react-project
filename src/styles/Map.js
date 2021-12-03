import { makeStyles } from "@material-ui/styles";
 const useStyles = makeStyles((theme) => ({
    googleMap: {
        width: '100%',
        height: '60vh',
        [theme.breakpoints.up(799)]: {
            height: '80vh'
          }
      },
      pin: {
        display: 'flex',
        justify: 'column',
        alignItems: 'flex-start',
        color: 'blue',
        [theme.breakpoints.down(400)]: {
            flexDirection: 'row-reverse',
        }
        
      },
      iconBtn: {padding: '15px 0px 0px 0px'},
      pinIcon: {
        color: 'red',
        fontSize: '3rem'
      },
      pinText: {
        fontSize: '1.4em',
        fontWeight: 700
      },
      streetView: {
        textAlign: 'center'
      },
      infoBox: {
         backgroundColor: '#0066cc', 
         borderRadius: 4,
         opacity: 0.85, 
         padding: 4, 
         textAlign: 'center', 
         color: '#fff',
         width: 90
      }
  }))
  export default useStyles