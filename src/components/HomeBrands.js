import React from 'react'
//import useStyles from '../styles/TopDeals'
import PageLoaderHandler from '../utils/PageLoaderHandler'
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        marginTop: '10px',
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            marginTop: '18px'
          }
    },
    topDealHeader: {
        paddingBottom: '15px'
    },
    shopMore: {
       '&:hover': {
           color: '#e67700'
       }
    },
    // media: {
    //     height: 0,
    //     paddingTop: '56.25%', // 16:9
    //   }
    
}))

function HomeBrands() {
    const triggerPageLoader = PageLoaderHandler()
    const classes = useStyles();
    return (
        <div className="pageComponents">
            <Paper className={classes.wrapper} >
                <Grid
                container
                justify='space-between'
                alignItems='center'
                className={classes.topDealHeader}
                >
                    <Grid item xs={6}>
                    <Typography variant='h6' noWrap>
                    Top deals
                    </Typography>
                    </Grid>
                    <Grid 
                    item
                    container
                    justify='flex-end'
                    alignItems='center'
                    xs={6} 
                    wrap='nowrap'
                    className={classes.shopMore}
                    >
                    <Typography
                    variant='h6' 
                    noWrap
                    component={Link} to="top_deals"
                    onClick={triggerPageLoader}
                    className='routerLink'
                    >
                    Shop More
                    </Typography>
                    <ChevronRightIcon />
                    </Grid>

                </Grid>
                <Grid
                container
                justify='space-between'
                spacing={1}
                >
                    <Grid item xs={6} sm={3} md={2}>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="images/carousel/carousel15.jpeg"
          title="Product image"
          //className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
                    </Grid>

                </Grid>

            </Paper> 
        </div>
    )
}

export default HomeBrands
