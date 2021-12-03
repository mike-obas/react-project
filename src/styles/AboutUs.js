import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
mainContainer: {
    padding: 20,
    margin: '10px auto',
    [theme.breakpoints.up(600)]: {
        margin: '20px auto'
    }
},
mainTitle: {
    textAlign: 'center'
}
}))

export default useStyles