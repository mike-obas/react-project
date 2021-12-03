import React, {useState, useEffect} from "react";
import useStyles from '../styles/TopDeals'
import PageLoaderHandler from "../utils/PageLoaderHandler";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import PlainProduct from './PlainProducts'
import axios from '../axiosConfig'
import {SixGridSkeleton} from '../utils/ProductSkeleton'

function TopDeals() {
  const triggerPageLoader = PageLoaderHandler();
  const classes = useStyles(); 
  const [products, setProducts] = useState(null)
  const [secondProducts, setSecondProducts] = useState(null)
  // eslint-disable-next-line
  const [errors, setErrors] = useState({})
  useEffect(() => { 
    let cancel = false;
    const firstCategory = "televisions"
    //const shuffledCategory = categories.sort(() => Math.random() - 0.5)
    async function fetchData(){
    await axios.get(`/getTopDeals/${firstCategory}/3`)
    .then(res => {
      if (cancel) return;
      setErrors({})
      res.data.length > 0 ? setProducts(res.data) : 
      setErrors({noProduct: "No product have been posted yet, come back later"})
    })
    .catch()
    const secondCategory = "musical_system"
    await axios.get(`/getTopDeals/${secondCategory}/3`)
    .then(res => {
      if (cancel) return;
      setErrors({})
      setSecondProducts(res.data)
    })
    .catch();
  }
  fetchData()
  return () => {cancel = true;}
  }, [])

        let recentProductsMarkUp = products ? 
        (products.map(product => 
        <PlainProduct product={product} key={product.createdAt}/>
        )) : '';
        let secondProductsMarkUp = secondProducts ?
        (secondProducts.map(product => 
        <PlainProduct product={product} key={product.createdAt}/>
        )) : '';
        


  return (
    <div className="pageComponents">
      <Paper className={classes.wrapper}>
        <Grid
          container
          alignItems="center"
          className={classes.topDealHeader}
        >
          <Grid item xs={12}>
            <Typography variant="h6" noWrap>
              Top deals
            </Typography>
            <Divider className={classes.topDealDivider} />
          </Grid>
        </Grid>
        <div className={classes.innerWrapper}>
        <Grid container spacing={2}>
        {/* {Top deals} */}
        {!recentProductsMarkUp && !secondProductsMarkUp && !errors.noProduct && <SixGridSkeleton />}
            {recentProductsMarkUp}
            {errors.noProduct && 
            <div style={{height: '150px', width: '100%', padding: '20px 10px'}}>
                <Typography variant="h4">
                  {errors.noProduct}
                </Typography>
              </div>}
              {secondProductsMarkUp}
        </Grid>
        <div className={classes.seeAllContainer}>
          <Typography 
          variant='subtitle2' 
          component={Link}
          className={`${classes.seeAll} routerLink`}
          to='top_deals'
          onClick={triggerPageLoader}
          >
            SEE ALL
          </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default TopDeals;
