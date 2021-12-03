import React, {useState, useEffect} from "react";
import useStyles from "../styles/OfficialBrands";
import { Grid, Paper, Typography } from "@material-ui/core";
import PlainProduct from "./PlainProducts";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";
import PageLoaderHandler from "../utils/PageLoaderHandler";
import axios from '../axiosConfig'
import {SixGridSkeleton} from '../utils/ProductSkeleton'

function OfficialBrands() {
    const triggerPageLoader = PageLoaderHandler();
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [brand, setBrand] = useState('eltak');
  const [category, setCategory] = useState(['home_theatre', 'solar_system'])
  const [products, setProducts] = useState(null)
  const [secondProducts, setSecondProducts] = useState(null)
  // eslint-disable-next-line
  const [errors, setErrors] = useState({})
  const [secondErrors, setSecondErrors] = useState({})

  const handleChange = (event) => {
    category.includes("home_theatre") ? setCategory(['refrigerators', 'commercial_oven'])
    : setCategory(['home_theatre', 'solar_system']);
    setLoading(true);
    setBrand(event.target.value);
  };

  useEffect(() => { 
    let cancel = false;
    const firstCategory = category[0]
    const secondCategory = category[1]
    async function fetchData(){
    await axios.get(`/getBrands/${firstCategory}/${brand}/3`)
    .then(res => {
      if (cancel) return;
      setErrors({})
      setProducts(res.data)
      setLoading(false)
      if(res.data.length === 0){
        setErrors({noProduct: "No product have been posted yet, come back later"})
      }
    })
    .catch(err => {
      setLoading(false)
    });
    await axios.get(`/getBrands/${secondCategory}/${brand}/3`)
    .then(res => {
      if (cancel) return;
      setSecondErrors({})
      setSecondProducts(res.data) 
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      //setErrors(err.response.data)
    });
  }
  fetchData()
  return () => {cancel = true;}
  }, [brand, category])

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
          justify="space-between"
          alignItems="center"
          className={classes.topDealHeader}
        >
          <Grid item xs={6}>
            <Typography variant="h6" noWrap>
              Official Brands
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            alignItems="center"
            xs={6}
            wrap="nowrap"
          >
              <FormControl className={classes.formControl}>
              {loading && <CircularProgress size={24} className={classes.circularProgress} />}
                <Select
                  labelId="top-categories"
                  id="select-brand"
                  value={brand}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <MenuItem selected value='eltak'>
                      <Typography variant='subtitle1'>
                      Eltak
                      </Typography>
                      </MenuItem>
                  <MenuItem value='lentz'>
                  <Typography variant='subtitle1'>
                      Lentz
                      </Typography>
                      </MenuItem>
                </Select>
              </FormControl>


          </Grid>
        </Grid>
        <div className={classes.innerWrapper}>
          <Grid container spacing={2}>
            {!recentProductsMarkUp && !secondProductsMarkUp && 
            !errors.noProduct && !secondErrors.noProduct &&
            <SixGridSkeleton />
            }
          {recentProductsMarkUp}
            {errors.noProduct && secondErrors &&
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
          to={brand}
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

export default OfficialBrands;
