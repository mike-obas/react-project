import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
       countDown:{ 
        color: '#6666ff',
        padding: '3px 6px 3px 6px',
        //textTransform: 'lowercase' 
    },
    countDownWrapper: {
    display: 'flex'
    }
}))

function CountDown(props) {
    const classes = useStyles()
    const { duration } = props
    const calculateTimeLeft = () => {
        let difference = +new Date(duration) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
          timeLeft = {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer=setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
      });

      const timerComponents = [];
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
      
        timerComponents.push(
          <Typography
          className={classes.countDown}
          key={interval}
          variant="subtitle1"
          >
            {timeLeft[interval]} {interval}{""}
          </Typography>
        );
      });
    return (
        <div className={classes.countDownWrapper}>
    {timerComponents.length ? timerComponents : <span>Time's up!</span>}
     </div>  
    )
}

export default CountDown
