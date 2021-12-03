import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        padding: 5,
        height: 500, 
        width: '99%',
        margin: 'auto',
        [theme.breakpoints.up("sm")]: {
        width: 500,
        }
    },
    searchItemContainer: {
        maxWidth: '100%',
        margin: 'auto',
    },
    emptyModal: {
        width: 500,
        padding: 20
    }
}))

export default useStyles