import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    verticalSpace: {
        marginBottom: '15px'
    },
    carousel: {
        height: 180,
        [theme.breakpoints.up("sm")]: {
            height: 320
        }
    },
    loaderAppBar: {
        height: 50
    },
    card: {
        padding: 5
    },
    auto: {
        margin: 'auto'
    },
    radius: {
        borderRadius: 4
    },
    hideFrmMobile: {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    }))
    export default useStyles