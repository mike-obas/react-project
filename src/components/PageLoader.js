import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0
  },
  progress: {
      height: '2px',
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  }
}));
 function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <LinearProgress 
        className={classes.progress}
        color="primary" 
        />
    </div>
  );
}
export default LinearIndeterminate