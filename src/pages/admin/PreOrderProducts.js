import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import useStyles from '../../styles/Categories'
import axios from '../../axiosConfig'
import { TwentyGridSkeleton } from '../../utils/ProductSkeleton'
import MarkUpProducts from './MarkUpProducts'
import CleanUpLoader from '../../utils/CleanUpLoader';
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";

function PreOrderProducts() {
    CleanUpLoader()
    const consumeContext = useContext(UseContext)
    const classes = useStyles()
    const docText = "Pre Order Products";
    const docProperty = "preOrderPrice";
    const docValue = 0;
    const limit = 10;
    
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
          <MarkUpProducts product={product} key={product.productId} />
        ))
      ) : (
        <TwentyGridSkeleton />
      );


    return (
        <React.Fragment>
            {consumeContext.authState.state ? (
        <React.Fragment>
          {!consumeContext.authState.disabled ? (
            <React.Fragment>
              {consumeContext.authState.role === "administrator" ||
              consumeContext.authState.role === "staff" ? (
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
        ) : (
            <Typography style={{ padding: 40 }} />
          )}
          </React.Fragment>
          ) : (
          <Typography style={{ padding: 40 }} variant="body2" color="error">
          {!consumeContext.authState.initializing &&
            "Your account has been disabled, contact support team"}
          </Typography>
          )}
          </React.Fragment>
          ) : (
          <Typography style={{ padding: 40 }} variant="body2" color="error">
          {!consumeContext.authState.initializing && "session timed out "}
          {!consumeContext.authState.initializing && (
          <Link to="/resume">login again</Link>
          )}
          </Typography>
          )}
          {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
        </React.Fragment>
    )
}

export default PreOrderProducts
