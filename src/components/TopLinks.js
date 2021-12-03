import React from 'react'
import { Grid, Paper, Typography, Avatar } from '@material-ui/core'
import useStyles from '../styles/TopLinks';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';
import StyleRoundedIcon from '@material-ui/icons/StyleRounded';
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import { Link } from 'react-router-dom'
import PageLoaderHandler from '../utils/PageLoaderHandler'
import SideMenu from './SideMenu'

function TopLinks() {
    const triggerPageLoader = PageLoaderHandler()

    const classes = useStyles()
    return (
        <div className="pageComponents">
            <Grid 
            className={classes.root}
            container
            justify="space-evenly" 
            >
            <Grid 
            item 
            xs={3} 
            className={classes.spaceEachLink}>
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='lentz'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar aria-label="Quick link"
                         className={classes.avatar}
                         >
                        <LocalMallRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Ntek Stores
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            <Grid item xs={3} className={classes.spaceEachLink}>
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='bulk_purchase'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar 
                        aria-label="Quick link" 
                        className={`${classes.avatar} ${classes.tealAvatar}`}
                        >
                        <ShoppingBasketRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Buy in Bulk
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            <Grid item xs={3} className={classes.spaceEachLink}>
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='shipping'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar 
                        aria-label="Quick link" 
                        className={`${classes.avatar} ${classes.tealAvatar}`}
                        >
                        <LocalShippingRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Fast Delivery
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            <Grid item xs={3} >
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='preorder'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar aria-label="Quick link" className={classes.avatar}>
                        <StyleRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Pre Order
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            </Grid>


            <Grid 
            className={classes.secondRoot}
            container
            justify="space-evenly" 
            >
            <Grid item xs={3} className={classes.spaceEachLink}>
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='televisions'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar 
                        aria-label="Quick link"
                        className={`${classes.avatar} ${classes.tealAvatar}`}
                         >
                        <LiveTvRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Televisions
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            <Grid item xs={3} className={classes.spaceEachLink}>
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='musical_system'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar 
                        aria-label="Quick link" 
                        className={classes.avatar}
                        >
                        <MusicNoteRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Sound
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            <Grid item xs={3} className={classes.spaceEachLink}>
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    className="routerLink"
                    component={Link} to='refrigerators'
                    onClick={triggerPageLoader}
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar aria-label="Quick link" className={classes.avatar}>
                        <KitchenRoundedIcon />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Refrigerators
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            <Grid item xs={3} >
            <Paper
            className={classes.linkContainer}
            >
                
                    <Grid 
                    container
                    justify='flex-start' 
                    alignItems='center'
                    >
                        <Grid item xs={12} md={3}>
                        <Avatar 
                        aria-label="Quick link" 
                        className={`${classes.avatar} ${classes.tealAvatar}`}
                        >
                        <SideMenu iconType={true} />
                         </Avatar>
                         </Grid>
                         <Grid item xs={12} md={9} zeroMinWidth>
                        <Typography 
                        variant='body2' 
                        className={classes.linkText}
                        noWrap
                        >
                        Categories
                        </Typography>
                        </Grid>
                    </Grid>
               
            </Paper>
            </Grid>
            </Grid>
        </div>
    )
}

export default TopLinks
