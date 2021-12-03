import React, { useState, useEffect } from "react";
import useStyles from "../styles/ProductReview";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Formatter, Currency } from "../utils/Currency";
import { Typography, Grid } from "@material-ui/core";
import { setCartItems } from "../utils/LocalStorage";
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import CountDown from "./CountDown";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

export function PricingInfo(props) {
  dayjs.extend(relativeTime)
  const classes = useStyles();
  let {
    eachProduct: {
      preOrderPrice,
      bulkPurchaseQuan,
      price,
      discount,
      stock,
      preOrderArrivalTime,
      preOrderDuration,
      productId,
      category,
    },
  } = props;

  const consumeContext = useContext(UseContext);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [minQuantity, setMinQuantity] = useState(1);
  const [cartDisabled, setCartDisabled] = useState(false)

  useEffect(() => {
    let cancel = false
    if (preOrderPrice && bulkPurchaseQuan) {
      if (cancel) return;
      setQuantity(bulkPurchaseQuan);
      setMinQuantity(bulkPurchaseQuan);
    }

  let difference = preOrderDuration && 
  (+new Date(preOrderDuration) - +new Date());
  const timeUp = (preOrderDuration && difference < 1) ? true : false
    if(preOrderDuration && timeUp){
      setCartDisabled(true)
    }
    return () => {cancel = true;}
  }, [preOrderPrice, bulkPurchaseQuan, preOrderDuration]);


  // function isInViewport(el){
  //   const rect = el.getBoundingClientRect();
  //   return (
  //   rect.top >= 0 &&
  //   rect.left >= 0 &&
  //   rect.bottom <= (window.innerHeight|| document.documentElement.clientHeiht) &&
  //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  //   }
  //   function handleScroll() {
  //     const bottomNav = document.getElementById("bottomNav");
  //     const cart = document.getElementById("mainCart");
  //     if(!isInViewport(cart)){
  //     bottomNav.style.display = "block";
  //     }
  //     else{
  //     bottomNav.style.display = "none";
  //     }
  //   }
  //   useEffect(() => {
  //     document.addEventListener('scroll', handleScroll)
  //     return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //     }
  //     // eslint-disable-next-line
  //   }, [])

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > minQuantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const saveCartItems = () => {
    setCartDisabled(true);
    setButtonLoading(true);
    new Promise((resolve, reject) => {
      setCartItems({ productId, category, quantity, consumeContext });
      resolve();
    }).then(() => {
      setButtonLoading(false)
      setCartDisabled(false)
    });
  };

  const markedUpStock = decodeURIComponent(stock);
  discount = Math.round(discount)
  let calcDiscountAmt =
    discount && markedUpStock === "available" ? price * (discount / 100) : "";
  let discountAmount = preOrderPrice || discount ? calcDiscountAmt : "";
  discountAmount = (bulkPurchaseQuan && preOrderPrice) && calcDiscountAmt;
  discountAmount = bulkPurchaseQuan && !preOrderPrice ? "" : calcDiscountAmt;
  discountAmount = markedUpStock !== "available" ? "" : discountAmount;
  let newPrice =( markedUpStock === "available" ? (
      Math.round(price - discountAmount)
    ) : (
      <Typography variant="subtitle1" color="error">
        Sold Out
      </Typography>
    ));
  let discountPercentage =
    discount && markedUpStock === "available"
      ? `You will get ${discount}% discount on purchase`
      : "";
  discountPercentage =
    bulkPurchaseQuan && markedUpStock === "available"
      ? `You will get ${discount}% discount on bulk purchase of more than ${bulkPurchaseQuan} quantities`
      : discountPercentage;
  discountPercentage =
    preOrderPrice && markedUpStock === "available"
      ? `You will get ${discount}% discount on pre-order, your order will be delivered ${ dayjs(preOrderArrivalTime).fromNow() } time`
      : discountPercentage;
  discountPercentage =
    preOrderPrice && markedUpStock === "available" && bulkPurchaseQuan
      ? `You will get ${discount}% discount on bulk pre-order of more than ${bulkPurchaseQuan} quantities, your order will be delivered 
      ${dayjs(preOrderArrivalTime).fromNow()} time`
      : discountPercentage;

  discountAmount = (discountAmount !== "" && (
    <Typography variant="subtitle1" className={classes.discountAmount}>
      {Currency.naira}
      &nbsp;
      {Formatter(price)}
    </Typography>
  ))

  discountPercentage = (discountPercentage !== "" && (
    <Typography variant="body2" style={{ marginTop: "7px" }}>
      <span className={classes.discountPercentage}>{discountPercentage}</span>
    </Typography>
  ));
  const priceMarkUp = (!isNaN(newPrice) ? (
    <Typography variant="h5" className={classes.amount}>
      {Currency.naira}
      &nbsp;
      {Formatter(newPrice)}
    </Typography>
  ) : (
    newPrice
  ))

  const markedUpPreOrderDuration = (preOrderPrice && preOrderDuration && (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      spacing={2}
      className={classes.quantityWrapper}
    >
      <Grid item xs={4}>
        <Typography variant="subtitle1">Ends in:</Typography>
      </Grid>
      <Grid item xs={8}>
        <ButtonGroup
          aria-label="outlined quantity button group"
          className={classes.countDownButtonGroup}
        >
          <Button>
            <CountDown duration={preOrderDuration} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>)
  )

  const addToCart = (
    markedUpStock === "available" &&
    <Button
      variant="contained"
      color="primary"
      className={classes.addToCartButton}
      startIcon={<AddShoppingCartIcon />}
      fullWidth
      size="large"
      disabled={cartDisabled}
      onClick={saveCartItems}
    >
      {buttonLoading && (
        <CircularProgress size={24} className={classes.circularProgress} />
      )}
      <Typography varaint="body1" noWrap>
        {preOrderPrice ? 'pre order' : 'Add to Cart'}
      </Typography>
    </Button>
  );

  return (
    <React.Fragment>
      <Grid container justify="flex-start" alignItems="center" spacing={2}>
        <Grid item xs={6} sm={4}>
          {priceMarkUp}
        </Grid>
        <Grid item xs={6} sm={8}>
          {discountAmount}
        </Grid>
      </Grid>
      {discountPercentage}
      {markedUpPreOrderDuration}
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        spacing={2}
        className={classes.quantityWrapper}
      >
        <Grid item xs={4}>
          <Typography variant="subtitle1">Quantity:</Typography>
        </Grid>
        <Grid item xs={8}>
          <ButtonGroup
            aria-label="outlined quantity button group"
            className={classes.quantityButtonGroup}
          >
            <Button onClick={decrementQuantity}>
              <RemoveIcon />
            </Button>
            <Button>{quantity}</Button>
            <Button onClick={incrementQuantity}>
              <AddIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <div id="mainCart">{addToCart}</div>

      {/* <div className={classes.bottomNav} id="bottomNav">
        <Grow in={true}>
          <div className={classes.bottomAddToCart}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={4} className={classes.amountContainer}>
                <div className={classes.bottomPrice}>
                  <span className={classes.bottomNavAmount}>{priceMarkUp}</span>
                </div>
              </Grid>
              <Grid item xs={8} className={classes.buttonContainer}>
                <div className={classes.bottomCartButton}>{addToCart}</div>
              </Grid>
            </Grid>
          </div>
        </Grow>
      </div> */}
    </React.Fragment>
  );
}

export function BrandName(props) {
  const {
    eachProduct: { brand },
  } = props;
  const markedUpBrand = decodeURIComponent(brand);
  return <React.Fragment>{markedUpBrand}</React.Fragment>;
}

export function ProductName(props) {
  const {
      productName
  } = props;
  const markedUpProductName = decodeURIComponent(productName);
  return markedUpProductName
}

export function Description(props) {
  const {
    description
  } = props;
  let markedUpDescription = (decodeURIComponent(description));
  return markedUpDescription
}
