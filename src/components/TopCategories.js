import React, {useState, useEffect} from "react";
import useStyles from "../styles/TopCategories";
import { Grid, Paper, Typography } from "@material-ui/core";
import PlainProduct from "./PlainProducts";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";
import PageLoaderHandler from "../utils/PageLoaderHandler";
import {SixGridSkeleton} from '../utils/ProductSkeleton'
import axios from '../axiosConfig'

function TopCategories() {
    const triggerPageLoader = PageLoaderHandler();
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('televisions');
  const [products, setProducts] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setLoading(true)
    setCategory(event.target.value);
  };

  useEffect(() => {     
    let cancel = false;
    axios.get(`/limitedProducts/${category}/6`)
    .then(res => {
      if (cancel) return;
      setErrors({})
      res.data.length > 0 ? setProducts(res.data) : 
      setErrors({noProduct: "No product have been posted yet, come back later"})
      setProducts(res.data)
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
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
          justify="space-between"
          alignItems="center"
          className={classes.topDealHeader}
        >
          <Grid item xs={6}>
            <Typography variant="h6" noWrap>
              Top Categories
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
                  id="select-category"
                  value={category}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <MenuItem selected value='televisions'>
                      <Typography variant='subtitle1'>
                      Televisions
                      </Typography>
                      </MenuItem>
                  <MenuItem value='musical_system'>
                  <Typography variant='subtitle1'>
                      Musical System
                      </Typography>
                      </MenuItem>
                  <MenuItem value='refrigerators'>
                  <Typography variant='subtitle1'>
                  Refrigerators
                      </Typography>
                      </MenuItem>
                      <MenuItem value='home_theatre'>
                  <Typography variant='subtitle1'>
                  Home Theatre
                      </Typography>
                      </MenuItem>
                      <MenuItem value='commercial_oven'>
                  <Typography variant='subtitle1'>
                  Commercial Oven
                      </Typography>
                      </MenuItem>
                      <MenuItem value='commercial_cookers'>
                  <Typography variant='subtitle1'>
                  Commercial Cookers
                      </Typography>
                      </MenuItem>
                      <MenuItem value='solar_system'>
                  <Typography variant='subtitle1'>
                  Solar System
                      </Typography>
                      </MenuItem>
                </Select>
              </FormControl>


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
        <div className={classes.seeAllContainer}>
          <Typography 
          variant='subtitle2' 
          component={Link}
          className={`${classes.seeAll} routerLink`}
          to={category}
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

export default TopCategories;
