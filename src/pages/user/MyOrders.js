import React, {useEffect, useState, Fragment} from 'react';
import useStyles from '../../styles/Admin'
import clsx from 'clsx'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Grid, Paper} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CleanUpLoader from "../../utils/CleanUpLoader"
import CircularProgress from '../../components/CircularProgress';
import axios from '../../axiosConfig';
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import { Formatter, Currency } from "../../utils/Currency";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import firebase from 'firebase/app'
import 'firebase/auth'

  const resolveLinkName = (productName) => {
    const markedUpProductName = decodeURIComponent(productName)
    let urlName = markedUpProductName.trim();
    urlName = urlName.replace(/\s\s+/g, ' ');
    urlName = urlName.toLowerCase();
    let resolvedUrlName = urlName.replace(/,?\s+/g, '-'); 
    return resolvedUrlName
  }

function createData(TotalPrice, Status, Date, Products) {
    let getProducts =  Products.map(product => 
        ({
            productName: product.productName,
            markedUpName: resolveLinkName(product.productName),
            productId : product.productId,
            category: product.category,
            brand: product.brand,
            price: product.price,
            priceAndQuantity: product.priceAndQuantity,
            originalPrice: product.originalPrice,
            discount: product.discount,
        })
    )
  return {
    TotalPrice, Status, Date, 
    items: getProducts
  };
}

function Row(props) {
  dayjs.extend(relativeTime)
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
        {row.TotalPrice}
            </TableCell>
        <TableCell align="center">{row.Status}</TableCell>
        <TableCell align="center">
            <Typography variant="body2" noWrap>
            {dayjs(row.Date).fromNow()}
            </Typography>
            </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography 
              className={classes.tabHeading} 
              variant="h6" gutterBottom
              >
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tabHeading}>Name</TableCell>
                    <TableCell className={classes.tabHeading}>Category/Brand</TableCell>
                    <TableCell className={classes.tabHeading} align="center">Subtotal</TableCell>
                    <TableCell className={classes.tabHeading} align="center">Initial Price/Discount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell component="th" scope="row">
                        <Typography 
                        component={Link} 
                        className="coloredLink"
                        to={`/product_review/${item.category}/${item.markedUpName}/${item.productId}`} 
                        variant="body2"
                        >
                        {item.productName}
                        </Typography>

                      </TableCell>
                      <TableCell>
                      <Typography variant="body2">
                          {item.category}/
                          {item.brand}
                          </Typography>
                          </TableCell>
                      <TableCell align="center">
                          <Typography className={classes.tabHeading} variant="body2">
                          {Currency.naira}
                            {Formatter(item.price)}
                          </Typography>
                          <Typography variant="caption" className={classes.tabHeading} color="textSecondary">
                          {Currency.naira}
                          {item.priceAndQuantity}
                          </Typography>
                          </TableCell>
                      <TableCell align="center">
                      <Typography variant="body2" className={classes.tabHeading}>
                            {item.discount !== "" && Currency.naira}
                            {item.discount !== "" && Formatter(item.originalPrice)}
                          </Typography>
                          <Typography variant="caption" className={classes.tabHeading} color="primary">
                          {item.discount}
                          </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Orders() {
CleanUpLoader()
const consumeContext = useContext(UseContext);
const classes = useStyles()
const [orders, setOrders] = useState(null)
const [orderId, setOrderId] = useState(null)
const [errors, setErrors] = useState({})
const [countOrders, setCountOrders] = useState(null)
const [buttonLoading, setButtonLoading] = useState(false)
const [rerender, setRerender] = useState(0)

useEffect(() => {
  setErrors({})
  let cancel = false;

  firebase.auth().onAuthStateChanged((user) => {
    if (cancel) return;
    if (user && !user.disabled && user.emailVerified) { 
        let emailAddress = user.email;
        axios.get(`/getUserOrders/email-${emailAddress}-20`)
    .then(res => {
      if (cancel) return;
        setOrders(res.data)
        return setCountOrders(res.data.length)
  })
  .catch(err => {
      return setErrors(err.response.data)
  })
    }
    else if(user && !user.emailVerified){
        setErrors({notVerified: 'Kindly verify your email address through the link we sent to your mail box'})
    }
    else{
        setErrors({notAuthenticated: 'session has timed out, kindly '})
    }
    });
    return () => { cancel = true }
}, [rerender])

const handleConfirm = (event) => {
    var str = event.currentTarget.value;
    setOrderId(str)
    const values = {
      open: true,
      performAction: false,
      message: `Are you sure your order have been delivered?`,
      actionText: 'Confirm',
      cancelText: 'Cancel'
    }
    return consumeContext.setDialog({ type: "open", modalContent: values })
  }

  useEffect(() => {
    let cancel = false;
    if(consumeContext.dialog.performAction && orderId){
        setButtonLoading(true)
        axios.post('/updateDelivery', {documentId: orderId}) 
        .then(res => {
          if (cancel) return;
          setButtonLoading(false)
          setRerender(prevState => prevState + 1);
          return consumeContext.setDialog({ type: "close" })
        })
        .catch(() =>  {
          setButtonLoading(false)
          return consumeContext.setDialog({ type: "close" })
        })
    }
    return () => { cancel = true }
  }, [orderId, consumeContext]);

  let rows = orders ? (
    orders.map((order) => (
        createData(
            <Fragment>
                <Typography className={classes.tabHeading}  variant="body2">
                {Currency.naira}
                {Formatter(order.totalPrice)}
                </Typography>
                <Typography variant="caption" color="primary">
                {(order.promo && order.promo !== "") && `includes `}
                {(order.promo && order.promo !== "") && Currency.naira}
                {(order.promo && order.promo !== "") && `${Formatter(order.promo)} promo`}
                </Typography>
            </Fragment>, 
            <Fragment>
           <Typography variant="body2" 
           className={classes.tabHeading}
           style={{
               color: order.status === 'unpaid' ? `red` : `green`,
               textTransform: "uppercase"
            }}
           >
            {order.status}
           </Typography>
           <Button 
           value={order.orderId}
           size="small"
           variant="contained" 
           onClick={!order.delivery ? handleConfirm : () => {}}
           style={{
               color: '#fff',
               background: !order.delivery ? `#e67700` : `green`,
            }}
           >
           {!order.delivery ? `confirm` : `received`}
       </Button>
       </Fragment>,
    order.createdAt,
    order.product
    )
    ))
  ) : [];

  return (
      <div className="pageComponents">
         {
            consumeContext.authState.state ?
            <React.Fragment>
          { !consumeContext.authState.disabled ?
            <React.Fragment>
          {consumeContext.authState.emailVerified ?
        (<div style={{padding: '30px 0px'}}>
          <Grid container justify="center">
            <Grid>
            <Paper className={classes.count}>
              <Typography variant="h6" className={classes.countText}>
              {(countOrders && countOrders === 1) && `${countOrders} Order`} 
              {(countOrders && countOrders > 1) && `${countOrders} Orders`} 
              </Typography>
            </Paper>
            </Grid>
          </Grid>
    <TableContainer component={Paper}>
        <Typography style={{color: 'green', padding: '10px 10px 5px'}} variant="body2" 
        className={classes.tabHeading}>
        Kindly click the confirm button once your order have been delivered
        </Typography>
        <Typography style={{color: '#e67700', padding: '5px 10px 5px'}} variant="body2" 
        className={classes.tabHeading}>
       Note that total amount includes a delivery fee of
       &nbsp;
       {Currency.naira}
       {Formatter(2000)}
       &nbsp; for states other than lagos
        </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">
            <Typography className={classes.tabHeading} variant="subtitle1">
                Amount
                </Typography>
                </TableCell>
            <TableCell align="center">
            <Typography className={classes.tabHeading} variant="subtitle1">
                Status/Delivery
                {buttonLoading && <CircularProgress />}
                </Typography>
                </TableCell>
            <TableCell align="center">
            <Typography className={classes.tabHeading} variant="subtitle1">
                Date
                </Typography>
                </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        { errors && (errors.noOrders || errors.error) &&
            <TableRow>
                <TableCell align="center" colSpan={4}>
        <Typography 
        variant="body1" 
        color="error"
        className={clsx(classes.boldText, classes.errorText)}
        >
            {errors.noOrders}
            {errors.error}
        </Typography>
    
                </TableCell>
            </TableRow>
                }

          {rows.length > 0 ?
          rows.map((row) => (
            <Row key={row.Date} row={row} />
          )) : <Fragment />}
        </TableBody>
      </Table>
    </TableContainer>
    </div>) : 
            <Typography color="error" 
            className={clsx(classes.boldText, classes.errorText)}
            >
            {errors && errors.notVerified}
            </Typography>
            }
            </React.Fragment>
            :
            <Typography 
            className={clsx(classes.boldText, classes.errorText)}
             variant="body2" color="error"
             >
              {!consumeContext.authState.initializing &&
              "Your account has been disabled, contact support team"
              }
            </Typography>
            }
            </React.Fragment>
            :
            <Typography 
            className={clsx(classes.boldText, classes.errorText)}
             variant="body2" color="error"
             >
             {(!consumeContext.authState.initializing && errors) && errors.notAuthenticated}
             {!consumeContext.authState.initializing && (
               <Link to="/login" >
                 login again.
               </Link>
             )}
            </Typography>
          }
           {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
    </div>
  );
}