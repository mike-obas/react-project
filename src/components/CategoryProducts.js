import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Grow from "@material-ui/core/Grow";
import { Formatter, Currency } from "../utils/Currency";
import useStyles from "../styles/PlainProducts";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import PlaceHolder from "./PlaceHolder";
import { setCartItems } from "../utils/LocalStorage";
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import {setRecentlyViewedItems} from '../utils/LocalStorage'

function CategoryProducts(props) {
  const consumeContext = useContext(UseContext);
  const quantity = 1;
  let {
    product: { 
      productId, category, preOrderPrice, bulkPurchaseQuan,
      productImages, productName, price, discount, stock
    }
  } = props;

  const saveRecentlyViewedItem = () => {
    setRecentlyViewedItems({ productId, category });
  };

  const saveCartItems = () => {
    setCartItems({ productId, category, quantity, consumeContext });
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
  let discountPercentage = (discount && markedUpStock === 'available') ? (`-${discount}%`) : ''
  discountPercentage = (bulkPurchaseQuan && markedUpStock === 'available') ? (`-${discount}% on bulk purchase`) : discountPercentage
  discountPercentage = (preOrderPrice && markedUpStock === 'available') ? (`-${discount}% on pre-order`) : discountPercentage

  const classes = useStyles();
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
      xs={6}
      sm={4}
      md={2}
      className={classes.productContainer}
      id="productContainer"
      onMouseOver={handleProductHover}
      onMouseOut={handleMousOut}
    >
      <Card className={classes.card} elevation={2} onClick={saveRecentlyViewedItem}>
        <Link to={`product_review/${category}/${resolvedUrlName}/${productId}`} className="routerLink"
        >
          <div className="list">
            <LazyLoad
            placeholder={<PlaceHolder />}
            once
            offset={100}
            >
              <CardMedia
                className={classes.media}
                component="img"
                alt={markedUpProductName}
                height="160"
                image={productImages[0]}
                title={markedUpProductName}
              />
            </LazyLoad>
          </div>

          <CardContent className={classes.cardContent}>
            <Typography
              variant="subtitle1"
              component="h6"
              className={classes.markedUpProductName}
              noWrap
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
                  {Formatter(price)}
                </Typography>
                }
                
                {
                  (!isNaN(newPrice)) ?
                  <Typography variant="subtitle1" className={classes.amount}>
                  {Currency.naira}
                  {Formatter(newPrice)}
                </Typography> : newPrice
                }

              </Grid>
            </Grid>
          </CardActions>
        </Link>
      </Card>
      <Grow
        in={hovered}
        style={{ transformOrigin: "0 0 0" }}
        {...(hovered ? { timeout: 1000 } : {})}
      >
        <IconButton 
        size="small" 
        className={classes.cartButton}
        disabled={ (markedUpStock !== 'available') ? true : false }
        onClick={saveCartItems}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Grow>
     
        {(discountPercentage !== '') &&
         <Typography variant="caption" className={classes.offerType}>
           {discountPercentage}
           </Typography>
           }
    </Grid>
  );
}

export default CategoryProducts;
