import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
wrapper: {
    width: "100%",
    marginTop: "12px",
    overflow: 'hidden',
    [theme.breakpoints.up("sm")]: {
      marginTop: "18px"
    },
  },
  innerWrapper: {
    padding: '16px 8px',
  },
  topDealHeader: {
    padding: theme.spacing(1),
    backgroundColor: '#ff901a'
  },
  formControl: {
    minWidth: 150,
    position: 'relative',
    [theme.breakpoints.down("xs")]: {
      minWidth: 80,
    },
  },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    color: '#fff'
  },
  seeAllContainer: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'right',
  },
  seeAll: {
      fontWeight: 'bold',
      padding: '1px 5px',
      color: '#e67700',
      backgroundColor: '#ffe6cc',
      '&:hover': {
        color: '#b35c00'
      }
  }

}))

export default useStyles