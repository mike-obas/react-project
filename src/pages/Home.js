import React from "react"
import { Grid, Paper } from "@material-ui/core"
import Carousel from "../components/Carousel"
import useStyles from "../styles/DisplayArea"
import DesktopCategory from "../components/DesktopCategory"
import TopLinks from "../components/TopLinks"
import { Link } from "react-router-dom"
import PageLoaderHandler from "../utils/PageLoaderHandler"
import CleanUpLoader from "../utils/CleanUpLoader"
import { Helmet } from "react-helmet-async"
import TopDeals from "../components/TopDeals"
import LazyLoad from 'react-lazyload'
import TopCategories from "../components/TopCategories"
import OfficialBrands from "../components/OfficialBrands"
import BrandImages from "../components/BrandImages"
import RecentlyViewed from '../utils/RecentlyViewed'
import { forceCheck } from 'react-lazyload';

function Home() {
  forceCheck()
  const triggerPageLoader = PageLoaderHandler();
  const classes = useStyles();
  CleanUpLoader();
  const localStorage = window.localStorage
  return (
    <React.Fragment>
      <Helmet>
        <title>Ntek Electronics | Nigerian electronics company</title>
        <meta
          name="description"
          content="Best Nigerian electronics store. Offers best shopping outlet for all kinds of electronics, including televisions, sound systems, commercial epuipments and lots more"
        />
      </Helmet>
      <div className={classes.displayArea}>
        <div className="pageComponents">
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Grid
              item
              style={{ width: "18.3%" }}
              className={classes.hideFrmMobile}
            >
              <DesktopCategory />
            </Grid>

            <Grid item xs className={classes.carouselContainer}>
              <div elevation={0} style={{overflow: 'hidden'}}>
                  <Carousel />
                  </div>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
              className={classes.hideFrmMobile}
              style={{ width: "18.45%" }}
            >
              <Grid item style={{width: '100%'}}>
                <Paper elevation={1} className={classes.brandItem}>
                  <Link
                    to="lentz"
                    className="routerLink"
                    onClick={triggerPageLoader}
                  >
                     <div className="list">
            <LazyLoad
            className={classes.lazyLoad}
            once
            offset={100}
            >
                    <img
                      className={classes.brandImage}
                      src="images/brand/brand1.jpg"
                      alt="Lentz Brand"
                    />
                    </LazyLoad>
                    </div>
                  </Link>
                </Paper>
              </Grid>
              <Grid item style={{width: '100%'}}>
                <Paper elevation={1} className={classes.brandItem}>
                  <Link
                    to="eltak"
                    className="routerLink"
                    onClick={triggerPageLoader}
                  >
                    <div className={`${classes.lazyLoadContainer} list`} >
            <LazyLoad
            className={classes.lazyLoad}
            once
            offset={100}
            >
                    <img
                      className={classes.brandImage}
                      src="images/brand/brand2.jpg"
                      alt="eltak Brand"
                    />
                    </LazyLoad>
                    </div>
                  </Link>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <TopLinks />
      <TopDeals />
      <TopCategories />
      <BrandImages />
      <OfficialBrands />
      {localStorage.getItem("recentlyViewedItems") && <RecentlyViewed />}
    </React.Fragment>
  );
}

export default Home;
