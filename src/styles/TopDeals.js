import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
wrapper: {
    width: "100%",
    marginTop: "10px",
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
  },
  topDealDivider: {
    borderBottom: '2px solid #e67700', 
    width: '93px'
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