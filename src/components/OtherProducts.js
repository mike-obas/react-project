import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import useStyles from '../styles/Categories'
import axios from '../axiosConfig'
import { TwentyGridSkeleton } from '../utils/ProductSkeleton'
import CategoryProducts from './CategoryProducts'

function OtherProducts(props) {
    const classes = useStyles()
    const {propsDetails: { docText, docProperty, docValue, limit}} = props
    const [products, setProducts] = useState(null)
    const [errors, setErrors] = useState({})

    useEffect(() => {  
      let cancel = false;   
        setErrors({})
        axios.get(`/otherProducts/${docProperty}-${docValue}/${limit}`)
        .then(res => {
          if (cancel) return;
          //setErrors({})
          res.data.length > 0 ? setProducts(res.data) : 
          setErrors({noProduct: "No product have been posted yet, come back later"})
        })
        .catch();
        return () => {cancel = true;}
      }, [docProperty, docValue, limit])

      let recentProductsMarkUp = products ? (
        products.map((product) => (
          <CategoryProducts product={product} key={product.productId} />
        ))
      ) : (
        <TwentyGridSkeleton />
      );
    return (
        <div className={`container ${classes.mainContainer}`}>
            <Grid container 
            alignItems="center" 
            className={classes.filterArea}
            spacing={2}
            wrap="nowrap"
            >
            <Grid item>
            <Button
            variant="outlined"
            size="small"
            >
            <Typography 
            className={classes.buttonText} 
            variant="subtitle2" 
            noWrap
            >
            {docText}
            </Typography>
            </Button>
            </Grid>
            </Grid>
            <div className={classes.categoryContainer}>
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
        </div>
    )
}

export default OtherProducts
