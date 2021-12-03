import React, { useState, useEffect } from "react";
import useStyles from "../styles/ShoppingCart";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Formatter, Currency } from "../utils/Currency";
import { Typography, Grid, Divider } from "@material-ui/core";
import { increaseQuantity, decreaseQuantity, deleteCartItem } from "../utils/LocalStorage";
import LazyLoad from 'react-lazyload'
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";

export function CartItemInfo(props) {
  const classes = useStyles();
  let {
    eachProduct: {
      preOrderPrice,
      bulkPurchaseQuan,
      price,
      discount,
      productImages,
      productName,
      stock,
      productId,
      category,
      quantity,
    },
  } = props;
  const consumeContext = useContext(UseContext);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [minQuantity, setMinQuantity] = useState(1);

  useEffect(() => {
    let cancel = false;
    if (preOrderPrice && bulkPurchaseQuan) {
      if (cancel) return;
      //setNewQuantity(bulkPurchaseQuan);
      setMinQuantity(bulkPurchaseQuan);
    }
    return () => {
      cancel = true;
    };
  }, [preOrderPrice, bulkPurchaseQuan]);

  const incrementQuantity = () => {
    setNewQuantity((prevQuantity) => prevQuantity + 1);
      increaseQuantity({ productId, category });
      consumeContext.countDispatch("increment"); 
  };
  const decrementQuantity = () => {
    if (newQuantity > minQuantity) {
        setNewQuantity((prevQuantity) => prevQuantity - 1);
        decreaseQuantity({ productId, category });
        consumeContext.countDispatch("decrement");
    }
  };
  const deleteItem = () => {
    deleteCartItem({ productId, category });
    consumeContext.countDispatch("increment");
  }
  const markedUpProductName = decodeURIComponent(productName)
  let urlName = markedUpProductName.trim();
  urlName = urlName.replace(/\s\s+/g, ' ');
  urlName = urlName.toLowerCase();
  let resolvedUrlName = urlName.replace(/,?\s+/g, '-'); 

  const markedUpStock = decodeURIComponent(stock);
  discount = Math.round(discount);
  let calcDiscountAmt =
    discount && markedUpStock === "available" ? price * (discount / 100) : "";
  let  discountAmount = preOrderPrice || discount ? calcDiscountAmt : "";

  discountAmount = (bulkPurchaseQuan && newQuantity >= bulkPurchaseQuan) ? calcDiscountAmt : discountAmount
  discountAmount = (bulkPurchaseQuan && newQuantity < bulkPurchaseQuan) ? '' : discountAmount

  discountAmount = markedUpStock !== "available" ? "" : discountAmount;
  
  let calcFormerPrice = discount ? Math.round(price) : '';
  let formerPrice = discount || preOrderPrice ? calcFormerPrice : '';
  formerPrice = (bulkPurchaseQuan && newQuantity >= bulkPurchaseQuan) ? 
  calcFormerPrice : formerPrice
  formerPrice = (bulkPurchaseQuan && newQuantity < bulkPurchaseQuan) ? 
  '' : formerPrice
  

  let mainPrice =
    markedUpStock === "available" && Math.round(price - discountAmount);
  let newPrice =
    markedUpStock === "available" ? (
      mainPrice * newQuantity
    ) : (
      <Typography variant="subtitle1" color="error">
        Sold Out
      </Typography>
    );
  let discountPercentage =
    discount && markedUpStock === "available" ? `-${discount}% discount` : "";
  discountPercentage =
    bulkPurchaseQuan &&
    markedUpStock === "available" &&
    newQuantity >= bulkPurchaseQuan
      ? `-${discount}% on bulk purchase`
      : discountPercentage;
  discountPercentage =
    preOrderPrice && markedUpStock === "available"
      ? `-${discount}% on pre-order`
      : discountPercentage;
  discountPercentage =
    preOrderPrice &&
    markedUpStock === "available" &&
    bulkPurchaseQuan &&
    newQuantity >= bulkPurchaseQuan
      ? `-${discount}% on bulk pre-order`
      : discountPercentage;
   discountPercentage =
    (discount && bulkPurchaseQuan &&
    newQuantity < bulkPurchaseQuan) ? '' : discountPercentage;

  const priceMarkUp = !isNaN(newPrice) ? (
    <Typography variant="h6" className={classes.productPrice}>
      {Currency.naira}
      {Formatter(newPrice)}
    </Typography>
  ) : (
    newPrice
  );

  return (
    <Grid item xs={12}>
      <Grid 
      container 
      spacing={3} 
      className={classes.itemContainer}
      >
        <Grid item xs={4} sm={3} md={2}
        component={Link}
        className="routerLink"
        to={`product_review/${category}/${resolvedUrlName}/${productId}`}
        >
          <div className={`${classes.imageContainer} list`}>
            <LazyLoad height={100} offset={100} once>
              <img
                className={classes.image}
                src={productImages[0]}
                alt={markedUpProductName}
              />
            </LazyLoad>
          </div>
        </Grid>
        <Grid item xs={8} sm={9} md={10}>
          <div
          component={Link}
          to={`product_review/${category}/${resolvedUrlName}/${productId}`}
          className="routerLink"
          >
          <Typography variant="subtitle1" className={classes.productName} noWrap>
            {markedUpProductName}
          </Typography>
            {priceMarkUp}
          <Typography variant="subtitle2" className={classes.subtotal}>
          {Currency.naira}
            {`${Formatter(mainPrice)} x ${newQuantity} items`}
          </Typography>

         { discountPercentage !== '' && 
         <Typography variant="caption" color="primary">
            {discountPercentage}
            &nbsp;
          </Typography>}
          {
            formerPrice !== '' && 
            <Typography variant="caption" className={classes.formerPrice}>
          {Currency.naira}
          {Formatter(formerPrice)}
          </Typography>
          }
          </div>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            spacing={1}
            className={classes.quantityWrapper}
          >
            <Grid item xs={4} sm={2} className={classes.quantityText}>
              <Typography variant="body2">Quantity:</Typography>
            </Grid>
            <Grid item xs={8} sm={10}>
              <ButtonGroup
              size="small"
                aria-label="outlined quantity button group"
                className={classes.quantityButtonGroup}
              >
                <Button size="small" onClick={decrementQuantity}>
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button size="small">{newQuantity}</Button>
                <Button size="small" onClick={incrementQuantity}>
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Button
      variant="text"
      color="primary"
      startIcon={<DeleteIcon />}
      size="small"
      onClick={deleteItem}
      style={{padding: 0}}
    >
      Remove
    </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </Grid>
  );
}

export function OrderInfo(props) {
    let {items, promo, minOrderAmount} = props;

  function prepareOrder(
    preOrderPrice,
    bulkPurchaseQuan,
    price,
    brand,
    discount,
    productImages,
    productName,
    stock,
    productId,
    category,
    quantity
  ) {
    return new Promise((resolve, reject) => {
      let markedUpProductName = decodeURIComponent(productName);
      const markedUpStock = decodeURIComponent(stock);
      discount = Math.round(discount);
      let calcDiscountAmt =
    discount && markedUpStock === "available" ? price * (discount / 100) : "";
  let  discountAmount = preOrderPrice || discount ? calcDiscountAmt : "";

  discountAmount = (bulkPurchaseQuan && quantity >= bulkPurchaseQuan) ? calcDiscountAmt : discountAmount
  discountAmount = (bulkPurchaseQuan && quantity < bulkPurchaseQuan) ? '' : discountAmount

  discountAmount = markedUpStock !== "available" ? "" : discountAmount;
  
  let calcFormerPrice = discount ? Math.round(price) : '';
  let formerPrice = discount || preOrderPrice ? calcFormerPrice : '';
  formerPrice = (bulkPurchaseQuan && quantity >= bulkPurchaseQuan) ? 
  calcFormerPrice : formerPrice
  formerPrice = (bulkPurchaseQuan && quantity < bulkPurchaseQuan) ? 
  '' : formerPrice

      let mainPrice =
        markedUpStock === "available" && Math.round(price - discountAmount);
      let newPrice =
        markedUpStock === "available"
          ? parseInt(mainPrice * quantity)
          : "sold out";
          let discountPercentage =
          discount && markedUpStock === "available" ? `-${discount}% discount` : "";
        discountPercentage =
          bulkPurchaseQuan &&
          markedUpStock === "available" &&
          quantity >= bulkPurchaseQuan
            ? `-${discount}% on bulk purchase`
            : discountPercentage;
        discountPercentage =
          preOrderPrice && markedUpStock === "available"
            ? `-${discount}% on pre-order`
            : discountPercentage;
        discountPercentage =
          preOrderPrice &&
          markedUpStock === "available" &&
          bulkPurchaseQuan &&
          quantity >= bulkPurchaseQuan
            ? `-${discount}% on bulk pre-order`
            : discountPercentage;
         discountPercentage =
          (discount && bulkPurchaseQuan &&
          quantity < bulkPurchaseQuan) ? '' : discountPercentage;
          let markedUpBrand = decodeURIComponent(brand);
          let newPriceAndQuantity = `${Formatter(mainPrice)} x ${quantity} items`;
      resolve({
        originalPrice: formerPrice,
        price: newPrice,
        priceAndQuantity: newPriceAndQuantity,
        discount: discountPercentage,
        productImage: productImages[0],
        productName: markedUpProductName,
        quantity: quantity,
        productId: productId,
        category: category,
        brand: markedUpBrand
      });
    });
  }
  let cartPromises = [];
  items.map((product) =>
    cartPromises.push(prepareOrder(
        product.preOrderPrice,
        product.bulkPurchaseQuan,
        product.price,
        product.brand,
        product.discount,
        product.productImages,
        product.productName,
        product.stock,
        product.productId,
        product.category,  
        product.quantity
        )
    )
  ); 
  return Promise.all(cartPromises)
    .then((response) => {
    let initialValue = 0;
  let totalAmount = response.reduce(
   (accumulator, currentValue) => accumulator + currentValue.price, initialValue);
   let promoValue = (promo && totalAmount > minOrderAmount) ? parseInt(promo) : '';
   let finalTotalPrice = (promo && totalAmount > minOrderAmount) ? 
   totalAmount - promoValue : totalAmount;
        let orderItem = {
            promo: promoValue,
            totalPrice: finalTotalPrice,
            product: response
        };
        return orderItem
    })
    .catch()
}
