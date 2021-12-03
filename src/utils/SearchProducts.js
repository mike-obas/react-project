import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Formatter, Currency } from "./Currency";
import useStyles from "../styles/PlainProducts";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import PlaceHolder from "../components/PlaceHolder";
import { useContext } from "react";
import { UseContext } from "./UseContext";
import {setRecentlyViewedItems} from './LocalStorage'
import { forceCheck } from 'react-lazyload';

function SearchProducts(props) { 
    forceCheck()
   const consumeContext = useContext(UseContext);
  let {
    product: { 
      productId, category, preOrderPrice, bulkPurchaseQuan,
      productImages, productName, price, discount, stock
    }
  } = props;

  const saveRecentlyViewedItem = () => {
    setRecentlyViewedItems({ productId, category });
    consumeContext.setSearchModal({type: "close"})
  };

  const markedUpProductName = decodeURIComponent(productName)
  let urlName = markedUpProductName.trim();
  urlName = urlName.replace(/\s\s+/g, ' ');
  urlName = urlName.toLowerCase();
  let resolvedUrlName = urlName.replace(/,?\s+/g, '-'); 

  const markedUpStock = decodeURIComponent(stock)
  discount = Math.round(discount)
  let calcDiscountAmt = (discount && markedUpStock === 'available') ? ( price * (discount/100) ) : ''
  let discountAmount = preOrderPrice || discount ? calcDiscountAmt : "";
  discountAmount = (bulkPurchaseQuan && preOrderPrice) && calcDiscountAmt;
  discountAmount = bulkPurchaseQuan && !preOrderPrice ? "" : calcDiscountAmt;
  discountAmount = markedUpStock !== "available" ? "" : discountAmount;
  let newPrice = (markedUpStock === 'available') ? Math.round(price - discountAmount) 
  : (<Typography variant='subtitle1' color='error'>Sold Out</Typography>)

  const classes = useStyles();
  // eslint-disable-next-line
  const [hovered, setHovered] = React.useState(false);
  const handleProductHover = () => {
    setHovered((prev) => !prev);
  };
  const handleMousOut = () => {
    setHovered((prev) => !prev);
  };
  return (
    <Grid
      item
      xs={12}
      className={classes.productContainer}
      id="productContainer"
      onMouseOver={handleProductHover}
      onMouseOut={handleMousOut}
    >
      <Card className={classes.card} elevation={1} onClick={saveRecentlyViewedItem}>
        <Link to={`/product_review/${category}/${resolvedUrlName}/${productId}`} 
        className="routerLink"
        >
            <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
          <div className="list">
            <LazyLoad
            overflow={true}
            placeholder={<PlaceHolder />}
            once
            offset={100}
            >
              <CardMedia
                className={classes.media}
                component="img"
                alt={markedUpProductName}
                height="80"
                image={productImages[0]}
                title={markedUpProductName}
              />
            </LazyLoad>
          </div>
          </Grid>
          <Grid item xs={8}>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="body2"
              component="h6"
              className={classes.markedUpProductName}
              noWrap
              style={{marginBottom: 5}}
            >
              {markedUpProductName}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Grid container>
              <Grid item xs={12}>

               { 
               (discountAmount !== '') &&
               <Typography
                  variant="subtitle2"
                  className={classes.discountAmount}
                >
                  {Currency.naira}
                  &nbsp;
                  {Formatter(price)}
                </Typography>
                }
                
                {
                  (!isNaN(newPrice)) ?
                  <Typography variant="subtitle2" className={classes.amount}>
                  {Currency.naira}
                  &nbsp;
                  {Formatter(newPrice)}
                </Typography> : newPrice
                }

              </Grid>
            </Grid>
          </CardActions>
          </Grid>

          </Grid>
        </Link>
      </Card>
     
    </Grid>
  );
}

export default SearchProducts;
