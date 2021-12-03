import React from "react"
import useStyles  from "../styles/BrandImages"
import { Grid, Paper } from "@material-ui/core"
import LazyLoad from "react-lazyload"
import { Link } from "react-router-dom"
import PageLoaderHandler from "../utils/PageLoaderHandler"
import Hidden from '@material-ui/core/Hidden';

function BrandImages() {
  const classes = useStyles();
  const triggerPageLoader = PageLoaderHandler();
  return (
    <div className="pageComponents">
      <Paper className={classes.wrapper}>
        <Grid container justify="space-between" spacing={1}>
        <Hidden xsDown>
          <Grid item xs={6} className={classes.eachBrand}>
            <Link to="eltak" onClick={triggerPageLoader} className="routerLink">
              <div className={`${classes.imageContainer} list`}>
                <LazyLoad className={classes.lazyLoad} once offset={100}>
                  <img
                    className={classes.image}
                    src="images/brand/brandDesk1.jpg"
                    alt="brand advert images"
                  />
                </LazyLoad>
              </div>
            </Link>
          </Grid>
          </Hidden>
          <Hidden xsDown>
          <Grid item xs={6} className={classes.eachBrand}>
            <Link to="eltak" onClick={triggerPageLoader} className="routerLink">
              <div className={`${classes.imageContainer} list`}>
                <LazyLoad className={classes.lazyLoad} once offset={100}>
                  <img
                    className={classes.image}
                    src="images/brand/brandDesk2.jpg"
                    alt="brand advert images"
                  />
                </LazyLoad>
              </div>
            </Link>
          </Grid>
          </Hidden>

          <Hidden smUp>
          <Grid item xs={6} className={classes.eachBrand}>
            <Link to="eltak" onClick={triggerPageLoader} className="routerLink">
              <div className={`${classes.imageContainer} list`}>
                <LazyLoad className={classes.lazyLoad} once offset={100}>
                  <img
                    className={classes.image}
                    src="images/brand/brandBody1.jpg"
                    alt="brand advert images"
                  />
                </LazyLoad>
              </div>
            </Link>
          </Grid>
          </Hidden>

          <Hidden smUp>
          <Grid item xs={6} className={classes.eachBrand}>
            <Link to="eltak" onClick={triggerPageLoader} className="routerLink">
              <div className={`${classes.imageContainer} list`}>
                <LazyLoad className={classes.lazyLoad} once offset={100}>
                  <img
                    className={classes.image}
                    src="images/brand/brandBody2.jpg"
                    alt="brand advert images"
                  />
                </LazyLoad>
              </div>
            </Link>
          </Grid>
          </Hidden>

        </Grid>
      </Paper>
    </div>
  );
}

export default BrandImages;
