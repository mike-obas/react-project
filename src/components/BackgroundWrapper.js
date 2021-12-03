import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        marginTop: '10px'
    }
}))

function BackgroundWrapper() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>   
        </div>
    )
}

export default BackgroundWrapper
