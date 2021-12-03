import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import useStyles from '../styles/Categories'
import CircularProgress from './CircularProgress';
//import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import axios from '../axiosConfig'
import { SixGridSkeleton } from '../utils/ProductSkeleton'
import CategoryProducts from './CategoryProducts'
import { Link } from "react-router-dom"

function Brands(props) {
    const classes = useStyles()
    const {brandProps: {CategoriesMarkUp, brand}} = props

    const [category, setCategory] = useState(CategoriesMarkUp[0].category)
    const [products, setProducts] = useState(null)
    // const [buttonLoading, setButtonLoading] = useState(false)
    const [selectLoading, setSelectLoading] = useState(false)
    //const [lastId, setLastId] = useState(null)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setSelectLoading(true)
        setCategory(event.target.value);
      };
      //app.get("/moreBrandProducts/:category/:lastProductId/:clause", moreBrandProducts);

    // const handleGetMore = () => {
    //     setButtonLoading(true);
    //     axios.get(`/moreBrandProducts/${category}/${lastId}/${brand}-${20}`)
    //     .then(res => {
    //         setLastId(res.data[0])
    //         let newProducts = res.data
    //         newProducts.shift()
    //       setProducts([...products, ...newProducts])
    //       setButtonLoading(false)
    //     })
    //     .catch(err => {
    //         setErrors(err.response.data)
    //         setButtonLoading(false)
    //     });
    // }

    useEffect(() => {     
        //setErrors({}) 
        axios.get(`/getFirstBatchBrands/${category}/${brand}-${50}`)
        .then(res => {
            //setLastId(res.data[0])
            setErrors({})
            let newProducts = res.data
            newProducts.shift()
          setProducts(newProducts)
          setSelectLoading(false)
        })
        .catch((err) => {
          setErrors(err.response.data)
          setSelectLoading(false)
        });
        return (cancel) => (cancel)
      }, [category, brand])

      let recentProductsMarkUp = products ? (
        products.map((product) => (
          <CategoryProducts product={product} key={product.productId} />
        ))
      ) : (
        <SixGridSkeleton />
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
            component={Link}
            to="lentz"
            disableElevation
            color="primary"
            variant={brand === 'lentz' ? "contained" : "outlined"}
            size="small"
            >
            <Typography
            className={brand === 'lentz' ? 
            classes.buttonTextActive : 
            classes.brandButtonText} 
            variant="subtitle2" 
            noWrap
            color="inherit"
            >
            Lentz
            </Typography>
            </Button>
            </Grid>
            <Grid item>
            <Button
            color="primary"
            disableElevation
            variant={brand === 'eltak' ? "contained" : "outlined"}
            size="small"
            component={Link}
            to="eltak"
            >
            <Typography 
            className={brand === 'eltak' ? 
            classes.buttonTextActive : 
            classes.brandButtonText}
            variant="subtitle2" 
            noWrap
            >
            Eltak
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
                value={category}
                onChange={handleChange}
                disabled={selectLoading}
                >
                   { 
                   CategoriesMarkUp && CategoriesMarkUp.map(eachCategory => (
                    <MenuItem 
                    key={eachCategory.category} 
                    value={eachCategory.category}
                    >
                      <Typography variant='subtitle2'>
                     {eachCategory.categoryText}
                      </Typography>
                      </MenuItem>
                   ))
                    }
                      </TextField>
                      {selectLoading && <CircularProgress />}
              </FormControl>
                </Grid>
            </Grid>
            <div className={classes.categoryContainer}>

            <Grid container spacing={1}>
            {!errors.noProduct && recentProductsMarkUp}
            {errors.noProduct && 
            <div style={{height: '150px', width: '100%', padding: '20px 10px'}}>
                <Typography variant="h4">
                  {errors.noProduct}
                </Typography>
              </div>}

        </Grid>

            {/* <Grid container justify="center" className={classes.buttonContainer}>
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
            </Grid> */}
            </div>   
        </div>
    )
}

export default Brands
