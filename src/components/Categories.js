import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import useStyles from '../styles/Categories'
import CircularProgress from './CircularProgress';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import axios from '../axiosConfig'
import { TwentyGridSkeleton } from '../utils/ProductSkeleton'
import CategoryProducts from './CategoryProducts'

function Categories(props) {
    const classes = useStyles()
    const {propsCategory: {category, categoryText}} = props
    const [products, setProducts] = useState(null)
    const [filter, setFilter] = useState('createdAt-desc');
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
        axios.get(`/moreProducts/${category}/${lastId}/${filter}`)
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
        axios.get(`/getProducts/${category}/${filter}`)
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
      }, [category, filter])

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
            {categoryText}
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
                  <MenuItem selected value='createdAt-desc'>
                      <Typography variant='subtitle2'>
                      Most recent
                      </Typography>
                      </MenuItem>
                  <MenuItem value='createdAt-asc'>
                  <Typography variant='subtitle2'>
                      Oldest
                      </Typography>
                      </MenuItem>
                  {/* <MenuItem value='price-asc'>
                  <Typography variant='subtitle2'>
                  Cheapest
                      </Typography>
                      </MenuItem>
                      <MenuItem value='price-desc'>
                  <Typography variant='subtitle2'>
                    Affordable
                      </Typography>
                      </MenuItem> */}
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

export default Categories
