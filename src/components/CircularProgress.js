import React, {Fragment} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    color: '#e67700'
  }
}));

function MyProgress() {
    const classes = useStyles()
    return (
        <Fragment>
            <CircularProgress size={24} className={classes.circularProgress} />
        </Fragment>
    )
}

export default MyProgress
