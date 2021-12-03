import React, {useState, useEffect} from "react";
import useStyles from '../styles/TopDeals'
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import PlainProduct from './PlainProducts'
import axios from '../axiosConfig'
import { SixGridSkeleton } from '../utils/ProductSkeleton'

function RelatedItems(props) {
  const {product: {category}} = props
  const classes = useStyles(); 
  const [products, setProducts] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {     
    let cancel = false;
    axios.get(`/limitedProducts/${category}/6`)
    .then(res => {
      if (cancel) return;
      setProducts(res.data)
    })
    .catch(err => {
      setErrors(err.response.data)
    });
    return () => {cancel = true}
  }, [category])


  let recentProductsMarkUp = products ? (
    products.map((product) => (
      <PlainProduct product={product} key={product.createdAt} />
    ))
  ) : (
    <SixGridSkeleton />
  );


  return (
    <div className="pageComponents">
      <Paper className={classes.wrapper}>
        <Grid
          container
          alignItems="center"
          //wrap="nowrap"
          className={classes.topDealHeader}
        >
          <Grid item xs={12}>
            <Typography variant="h6" noWrap>
              Related items
            </Typography>
            <Divider className={classes.topDealDivider} />
          </Grid>
        </Grid>
        <div className={classes.innerWrapper}>
        <Grid container spacing={2}>
            {!errors.noProduct && recentProductsMarkUp}
            {errors.noProduct && 
            <div style={{height: '150px', width: '100%', padding: '20px 10px'}}>
                <Typography variant="h4">
                  {errors.noProduct}
                </Typography>
              </div>}

          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default RelatedItems;
