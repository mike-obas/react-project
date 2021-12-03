import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import useStyles from '../../styles/Categories'
import CircularProgress from '../../components/CircularProgress';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import axios from '../../axiosConfig'
import { TwentyGridSkeleton } from '../../utils/ProductSkeleton'
import MarkUpProducts from './MarkUpProducts'
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";

function AdminCategories() {
    const consumeContext = useContext(UseContext)
    const classes = useStyles()
    const [products, setProducts] = useState(null)
    const [filter, setFilter] = useState('televisions');
    const [buttonLoading, setButtonLoading] = useState(false)
    const [selectLoading, setSelectLoading] = useState(false)
    const [lastId, setLastId] = useState(null)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setSelectLoading(true)
        setFilter(event.target.value);
      };
    const handleGetMore = () => {
        setButtonLoading(true);
        axios.get(`/moreProducts/${filter}/${lastId}/createdAt-desc`)
        .then(res => {
            setLastId(res.data[0])
            let newProducts = res.data
            newProducts.shift()
          setProducts([...products, ...newProducts])
          setButtonLoading(false)
        })
        .catch(err => {
            setErrors(err.response.data)
            setButtonLoading(false)
        });
    }

    useEffect(() => {  
      let cancel = false;   
        setErrors({})
        axios.get(`/getProducts/${filter}/createdAt-desc`)
        .then(res => {
          if (cancel) return;
            setLastId(res.data[0])
            let newProducts = res.data
            newProducts.shift()
          setProducts(newProducts)
          setSelectLoading(false)
        })
        .catch(err => {
          setSelectLoading(false)
          return setErrors(err.response.data)
        });
        return () => {cancel = true;}
      }, [filter, consumeContext.countState])

      let recentProductsMarkUp = products ? (
        products.map((product) => (
          <MarkUpProducts product={product} key={product.productId} />
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
            Categories
            </Typography>
            </Button>
            </Grid>
            <Grid item >
            <FormControl className={classes.formControl}>
              <TextField
                id="filter"
                select
                size="small"
                variant="standard"
                value={filter}
                onChange={handleChange}
                disabled={selectLoading}
                >
                  <MenuItem selected value='televisions'>
                      <Typography variant='subtitle2'>
                     Televisions
                      </Typography>
                      </MenuItem>
                  <MenuItem value='home_theatre'>
                  <Typography variant='subtitle2'>
                     Home Theatre
                      </Typography>
                      </MenuItem>
                      <MenuItem value='refrigerators'>
                  <Typography variant='subtitle2'>
                     Refrigerators
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='musical_system'>
                  <Typography variant='subtitle2'>
                  Musical System
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='commercial_cookers'>
                  <Typography variant='subtitle2'>
                  Commercial Cookers
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='commercial_oven'>
                  <Typography variant='subtitle2'>
                  Commercial Oven
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='microwave_oven'>
                  <Typography variant='subtitle2'>
                  Microwave Oven
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='solar_system'>
                  <Typography variant='subtitle2'>
                  Solar System
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='public_address_system'>
                  <Typography variant='subtitle2'>
                  Public Address System
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='deep_fryers'>
                  <Typography variant='subtitle2'>
                  Deep Fryers
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='blenders'>
                  <Typography variant='subtitle2'>
                  Blenders
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='mixers'>
                  <Typography variant='subtitle2'>
                  Mixers
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='work_tables'>
                  <Typography variant='subtitle2'>
                  Work Tables
                      </Typography>
                      </MenuItem> 
                      <MenuItem value='kitchen_rack'>
                  <Typography variant='subtitle2'>
                  Kitchen Rack
                      </Typography>
                      </MenuItem> 

                      </TextField>
                      {selectLoading && <CircularProgress />}
              </FormControl>
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
            {/* <Grid
            container
            spacing={2}
            >
                {recentProductsMarkUp}
            </Grid> */}
            <Grid container justify="center" className={classes.buttonContainer}>
                <Grid item xs={12} className={classes.noMoreProduct}>
                <Typography variant="body2">
                    {errors.noMoreProduct && errors.noMoreProduct}
                </Typography>
                </Grid>
                <Grid item>
            <Button
            variant="outlined"
            color="primary"
            endIcon={<ExpandMoreOutlinedIcon />}
            disabled={buttonLoading}
            onClick={handleGetMore}
            >
      {buttonLoading && <CircularProgress />}
      <Typography 
      className={classes.buttonText} 
      variant="body2" 
      noWrap
      >
        More results
        </Typography>
    </Button>
    </Grid>
            </Grid>
            </div>   
        </div>
    )
}

export default AdminCategories
