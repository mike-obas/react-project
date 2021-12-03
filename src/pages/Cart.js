import React, { useState, useEffect, Fragment } from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import { Divider, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';
import CircularProgress from '../components/CircularProgress'
import axios from '../axiosConfig';
import useStyles from '../styles/ShoppingCart'
import {CartItemInfo, OrderInfo} from '../components/CartProducts'
import { DetailSkeleton } from "../utils/ProductSkeleton";
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import Button from "@material-ui/core/Button";
import { Formatter, Currency } from "../utils/Currency";
import {Helmet} from 'react-helmet-async'
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app'
import 'firebase/auth'

    function Cart() {
        const classes = useStyles()
        CleanUpLoader()
        const consumeContext = useContext(UseContext);
        const [products, setProducts] = useState(null)
        const [buttonLoading, setButtonLoading] = useState(false);
        // eslint-disable-next-line
        const [promo, setPromo] = useState(null)
        const [minOrderAmount, setMinOrderAmount] = useState(null)
        const [orderItems, setOrderItems] = useState(null)
        const [rerender, setRerender] = useState(0)
        const [errors, setErrors] = useState({error: ""})
        let history = useHistory();

      useEffect(() => {
      let cancel = false;
      firebase.auth().onAuthStateChanged((user) => {
          if (cancel) return;
          if (user && !user.disabled) { 
              let uid = user.uid;
              axios.get(`/singleQuery/users/${uid}`)
              .then(res => {
                  if (cancel) return;
                  if(res.data.promo !== "used" && res.data.promo !== undefined){
                  axios.get(`/singleQuery/promo/registration`)
                  .then(res => {
                    setPromo(res.data.promoAmount)
                    setMinOrderAmount(res.data.minOrderAmount)
                    return setRerender(prevState => prevState + 1)
                  })
                  .catch()
                }
                else {return;}
              })
              .catch();
          }
          else{}
          });
          return () => {cancel = true }
          }, [])
  
const localStorage = window.localStorage; 
  useEffect(() => {
    let cancel = false;
    if(localStorage.getItem("cartItems")){
      let cartProducts = JSON.parse(localStorage.getItem("cartItems"));
      function queryProducts(category, productId, quantity){
      return new Promise((resolve, reject) => {
      axios.get(`/eachProduct/${category}/${productId}`)
      .then(res => {
        if (cancel) return;
          let newProducts = {
              quantity: quantity,
              ...res.data
            }
        resolve(newProducts)
      })
      .catch( (err) => {
        let identifier = productId + category;
        new Promise((resolve, reject) => {
        cartProducts.forEach((product, index, cartProducts) => {
          if (identifier === product.identifier) {
            cartProducts.splice(index, 1)
            resolve(cartProducts);
          } else if (
            index === cartProducts.length - 1 &&
            identifier !== product.identifier
          ) {reject();}
        });
      })
      .then((items) => {
      setErrors(err.response.data)
      return localStorage.setItem("cartItems", JSON.stringify(items));
      })
      .catch(() => setErrors(({error: ""})))
      });
    })
  }
  let productPromises = [];
  cartProducts.map((product) => 
  productPromises.push(queryProducts(product.category, product.productId, product.quantity)) 
);
//resolve all promises
Promise.all(productPromises)
    .then((response) => {
      if (cancel) return;
      setProducts(response)
    })
    .catch()
    }
    return () => {cancel = true}
    // eslint-disable-next-line
  }, [consumeContext.countState, rerender, errors.error])
  
  let currentCartItems = products ? 
        (products.map(product => 
        <CartItemInfo eachProduct={product} key={product.productId}/>
        ))
        : <DetailSkeleton />;
    let orderValues = {items: products, promo, minOrderAmount}
    let resolveOrderItems = products && OrderInfo(orderValues)
    useEffect(() => {
    resolveOrderItems && (resolveOrderItems.then(result => { 
      setOrderItems(result)
    }
      )
      )
     // eslint-disable-next-line
    }, [products, rerender])

    const handleCheckOut = () => {
        setButtonLoading(true)
        axios.post("/addCartItems", orderItems)
        .then(res => {
          localStorage.setItem("partialOrder", res.data)
          setButtonLoading(false)
          history.push("/checkout");
        })
        .catch(setButtonLoading(false))
    }

        return (
          <Fragment>
        <Helmet>
        <title>Ntek shopping cart</title>
        <meta name="description" content="Amazing shopping experience" />
      </Helmet>
            <div className="container pageComponents">
                <Grid container alignItems="center">
                    <Grid item xs={12} className={classes.cartBasket}>
                    <IconButton className={classes.cartIconBtn}>
                    <LocalMallRoundedIcon color="inherit" fontSize="large" />
                    &nbsp;
                    <Typography variant="h5" className={classes.boldText}>
                    Shopping Cart
                    </Typography>
                    </IconButton>
                    </Grid>
                   </Grid>
                   <div className={classes.generalContainer}>
               <Paper className={`${classes.mainContainer} pageComponents`}>
                 {
                   localStorage.getItem('cartItems') ?
                   <div>
                   <Grid container spacing={2}>

                   {currentCartItems}

                   </Grid>
                   <Grid container justify="center" spacing={2} className={classes.total}>
                    <Grid item xs={5} style={{textAlign: 'center'}}>
                        <Typography variant="h6">
                        Total
                        </Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography variant="h5" className={classes.totalAmount}>
                        {orderItems && Currency.naira}
                        {orderItems && Formatter(orderItems.totalPrice)}
                        </Typography>
                        {
                        (orderItems && orderItems.promo !== '') &&
                         (<Typography variant="body2" className={classes.promo}>
                        {orderItems && Currency.naira}
                        {orderItems && Formatter(orderItems.promo + orderItems.totalPrice)} 
                        &nbsp; - &nbsp; 
                        {orderItems && Currency.naira}
                        {orderItems && `${Formatter(orderItems.promo)} promo` }
                        </Typography>)
                        }

                        </Grid>
                   </Grid>
                   <Divider className={classes.divider} />
                   <Grid container  className={classes.checkoutContainer}>
                   <Button
            onClick={handleCheckOut}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={buttonLoading}
          >
            {buttonLoading && (
                  <CircularProgress />
                )}
            <Typography variant="subtitle1" className={classes.submitText}>
              Checkout
            </Typography>
          </Button>
                   </Grid>
                   </div> 
                   :
                   <Typography style={{padding: 40, textAlign: 'center'}} variant="h6" color="error">
                     Cart is empty
                   </Typography>
                   }
                </Paper>
                </div>
           </div>
           </Fragment>
        )
    }

export default Cart
