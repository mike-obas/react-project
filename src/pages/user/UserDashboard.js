import React, {useEffect, useState} from 'react'
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core'
import useStyles from '../../styles/User'
import clsx from 'clsx'
import CleanUpLoader from "../../utils/CleanUpLoader";
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import firebase from 'firebase/app'
import axios from '../../axiosConfig'
import 'firebase/auth'
import { EditOutlined, ShoppingBasketOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';


function UserDashboard() {
    CleanUpLoader()
    const classes = useStyles()
    const consumeContext = useContext(UseContext)
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        let cancel = false;

    firebase.auth().onAuthStateChanged((user) => {
        if (cancel) return;
        if (user && !user.disabled && user.emailVerified) { 
            let uid = user.uid;
            axios.get(`/singleQuery/users/${uid}`)
            .then(res => {
                if (cancel) return;
                setUser(res.data)
            })
            .catch(err => {
                setErrors(err.response.data)
            });
        }
        else if(user && !user.emailVerified){
            setErrors({notVerified: 'Kindly verify your email address through the link we sent to your mail box'})
        }
        else{
            setErrors({notAuthenticated: 'session has timed out, kindly '})
        }
        });
        return () => {cancel = true }
        }, [])

    return (
        <div className="pageComponents">
            {
            consumeContext.authState.state ?
            <React.Fragment>
          { !consumeContext.authState.disabled ?
            <React.Fragment>
          {consumeContext.authState.emailVerified ?
            <div className={classes.generalContainer}>
                <Paper className={classes.mainContainer}>
                    <Typography variant="h6" 
                    className={clsx(classes.boldText, classes.welcomeText)} 
                    noWrap
                    >
                        Welcome, 
                        &nbsp;
                        {user && user.firstName}
                        &nbsp;
                        {user && user.surname}
                    </Typography>
                    <Divider className={classes.divider} />
                <Typography variant="subtitle1" color="textSecondary" 
                className={clsx(classes.boldText, classes.addressTitle)} >
                    Your Email Address
                </Typography>
                <Typography variant="body2" className={classes.userText} color="inherit">
                    {user && user.email}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle1" color="textSecondary" 
                className={clsx(classes.boldText, classes.addressTitle)} >
                    Your Default Shipping Address
                </Typography>
                <Typography variant="body2" className={classes.userText} color="inherit">
                    {user && user.deliveryAddress.toLowerCase()}
                    &nbsp;
                    {user && `${user.state},`}
                    &nbsp;
                    {user && `${user.country}.`}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography className={classes.userText} variant="body1">
                {user && user.phoneNumber}
                </Typography>
                <Grid container spacing={1} className={classes.buttonArea}>
                    <Grid item xs={6}>
                        <Button 
                        color="primary"
                        variant="contained" 
                        size="small"
                        startIcon={<ShoppingBasketOutlined />}
                        component={Link}
                        to="user_orders"
                        >
                        My Orders
                        </Button>

                    </Grid>
                    {/* <Grid item xs></Grid> */}
                    <Grid item xs={6} className={classes.editButton}>
                    <Button 
                    color="primary"
                        variant="contained" 
                        size="small"
                        startIcon={<EditOutlined />}
                        component={Link}
                        to="profile_update"
                        >
                        Edit profile
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
            </div>
            : 
            <Typography color="error" 
            className={clsx(classes.boldText, classes.errorText)}
            >
            {errors && errors.notVerified}
            </Typography>
            }
            </React.Fragment>
            :
            <Typography 
            className={clsx(classes.boldText, classes.errorText)}
             variant="body2" color="error"
             >
              {!consumeContext.authState.initializing &&
              "Your account has been disabled, contact support team"
              }
            </Typography>
            }
            </React.Fragment>
            :
            <Typography 
            className={clsx(classes.boldText, classes.errorText)}
             variant="body2" color="error"
             >
             {(!consumeContext.authState.initializing && errors) && errors.notAuthenticated}
             {!consumeContext.authState.initializing && (
               <Link to="/login" >
                 login again
               </Link>
             )}
            </Typography>
          }
           {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
        </div>
    )
}

export default UserDashboard
