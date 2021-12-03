import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: '0px 10px',
        margin: 'auto'
    },
    categoryContainer: {
        padding: '25px 0px 20px'
    },
    filterArea: {
    overflowX: 'auto',
    zIndex: theme.zIndex.mobileStepper,
    backgroundColor: '#f2f2f2',
    padding: '5px 0px 3px',
    position: "sticky",
    top: 60,
    [theme.breakpoints.up("md")]: {
        padding: '10px 0px 5px',
        top: 72
    }
    },
    formControl: {
    padding: 0,
    marginTop: '-5px'
    },
    buttonContainer: {
        paddingTop: '30px'
    },
    buttonText: {
        textTransform: 'capitalize'
    },
    brandButtonText: {
        textTransform: 'capitalize',
        color: '#000'
    },
    buttonTextActive: {
        textTransform: 'capitalize',
        color: '#fff'
    },
    noMoreProduct: {
        color: 'green',
        textAlign: 'center'
    }
}));

export default useStyles