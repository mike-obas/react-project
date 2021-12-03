import React, { useEffect, useState } from "react";
import useStyles from '../styles/TopDeals'
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import PlainProducts from '../components/PlainProducts'
import { SixGridSkeleton } from "./ProductSkeleton";
import axios from '../axiosConfig'

function RecentlyViewed() {
  const classes = useStyles();
  const [products, setProducts] = useState(null)
  const [errors, setErrors] = useState({error: ""})
  const localStorage = window.localStorage;  
  useEffect(() => {
    let cancel = false;
    if(localStorage.getItem("recentlyViewedItems")){
      let cartProducts = JSON.parse(localStorage.getItem("recentlyViewedItems"));
      function queryProducts(category, productId){
      return new Promise((resolve, reject) => {
      axios.get(`/eachProduct/${category}/${productId}`)
      .then(res => {
        if (cancel) return;
        resolve(res.data)
      })
      .catch( (err) => {
        let identifier = productId + category;
        new Promise((resolve, reject) => {
        cartProducts.forEach((product, index, cartProducts) => {
          if (identifier === product.identifier) {
            cartProducts.splice(index, 1)
            resolve(cartProducts);
          } else if (
            index === cartProducts.length - 1 &&
            identifier !== product.identifier
          ) {reject();}
        });
      })
      .then((items) => {
      setErrors(err.response.data)
      return localStorage.setItem("recentlyViewedItems", JSON.stringify(items));
      })
      .catch(() => setErrors(({error: ""})))
      });
    })
  }
  let productPromises = [];
  cartProducts.map((product) => 
  productPromises.push(queryProducts(product.category, product.productId)) 
);
//resolve all promises
Promise.all(productPromises)
    .then((response) => {
      if (cancel) return;
      setProducts(response)
    })
    .catch()
    }
    return () => {cancel = true}
    // eslint-disable-next-line
  }, [errors.error])

        let recentProductsMarkUp = products ? 
        (products.map(product => 
        <PlainProducts product={product} key={product.productId}/>
        ))
        : <SixGridSkeleton />;

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
              Recently viewed items
            </Typography>
            <Divider style={{
              borderBottom: '2px solid #e67700', 
                width: '200px'}}  
                />
          </Grid>
        </Grid>
        <div className={classes.innerWrapper}>
        <Grid container spacing={2}>
            {recentProductsMarkUp}
        </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default RecentlyViewed;
