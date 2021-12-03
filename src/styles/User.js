import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    generalContainer: {
        padding: '35px 0px 30px'
    },
    mainContainer: {
        maxWidth: '700px',
        margin: 'auto',
        padding: '10px'
    },
    welcomeText: {
        color: "green"
    },
    boldText: {
        fontWeight: 700
    },
    userText: {
        textTransform: 'capitalize'
    },
    addressTitle: {
        paddingBottom: '3px'
    },
    divider: {
        margin: '10px 0px'
    },
    editButton: {
        textAlign: 'right'
    },
    errorText: {
        padding: '40px 0px'
    },
    buttonArea: {
        padding: '20px 0px 5px'
    }


}));

export default useStyles