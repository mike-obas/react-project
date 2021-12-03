import React, {useEffect, useState, Fragment} from 'react';
import useStyles from '../../styles/Admin'
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
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import axios from '../../axiosConfig';
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import { Formatter, Currency } from "../../utils/Currency";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


  const resolveLinkName = (productName) => {
    const markedUpProductName = decodeURIComponent(productName)
    let urlName = markedUpProductName.trim();
    urlName = urlName.replace(/\s\s+/g, ' ');
    urlName = urlName.toLowerCase();
    let resolvedUrlName = urlName.replace(/,?\s+/g, '-'); 
    return resolvedUrlName
  }

function createData(Customer, TotalPrice, Address, Status, Date, Products) {
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
    Customer, TotalPrice, Address, Status, Date, 
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
        <TableCell align="center" component="th" scope="row">
          { row.Customer }
        </TableCell>
        <TableCell align="center">
        {row.TotalPrice}
            </TableCell>
        <TableCell align="center">{row.Address}</TableCell>
        <TableCell align="center">{row.Status}</TableCell>
        <TableCell align="center">
            <Typography variant="body2" noWrap>
            {dayjs(row.Date).fromNow()}
            </Typography>
            </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
const [lastId, setLastId] = useState(null)
const [errors, setErrors] = useState({})
const [buttonLoading, setButtonLoading] = useState(false)
const [countOrders, setCountOrders] = useState(null)

useEffect(() => {
  setErrors({})
  let cancel = false;
  axios.get("/getProducts/orders/createdAt-desc")
  .then(res => {
      if (cancel) return;
      setLastId(res.data[0])
            let newProducts = res.data
            newProducts.shift()
            setOrders(newProducts)
          
  })
  .catch()
    return () => { cancel = true }
}, [])

useEffect(() => {
  let cancel = false;
 axios.get("/countQuery/ordersCount/countField")
 .then(res => {
  if (cancel) return;
  setCountOrders(res.data)
 })
 .catch()
  return () => {
    cancel = true
  }
}, [])

const handleGetMore = () => {
    setButtonLoading(true);
    axios.get(`/moreProducts/orders/${lastId}/createdAt-desc`)
    .then(res => {
        setLastId(res.data[0])
        let newProducts = res.data
        newProducts.shift()
      setOrders([...orders, ...newProducts])
      setButtonLoading(false)
    })
    .catch(err => {
        setErrors(err.response.data)
        setButtonLoading(false)
    });
}

  let rows = orders ? (
    orders.map((order) => (
        createData(
            <Fragment>
            {!order.email && 
            <Typography variant="body2" color="error">
            Partial Order
            </Typography>}
            <a 
            className="coloredLink"
            href={`mailto: ${order.email}`}
            >
            {order.email}
            </a>
            <Typography variant="body2">
            {order.firstName} 
            &nbsp;
            {order.surname}
            </Typography>
            <Typography variant="body2">
            {order.phoneNumber}
            </Typography>
            </Fragment>, 
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
            <Typography variant="caption">
                {order.deliveryAddress}
                &nbsp;
                {order.state}
                &nbsp;
                {order.country}
            </Typography>
            </Fragment>,
            <Fragment>
           <Typography variant="body2" 
           style={{
               color: order.status === 'unpaid' ? `teal` : `green`,
               textTransform: "uppercase"
            }}
           >
            {order.status}
           </Typography>
           <Typography 
           variant="body2" 
           style={{
               color: !order.delivery ? `red` : `green`,
               textTransform: "uppercase"
            }}
           >
           {!order.delivery ? `pending` : `delivered`}
       </Typography>
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
          { (consumeContext.authState.role === "administrator" ||
           consumeContext.authState.role === "staff")
          ?
        (<div style={{padding: '30px 0px'}}>
          <Grid container justify="center">
            <Grid>
            <Paper className={classes.count}>
              <Typography variant="h6" className={classes.countText}>
              {countOrders && countOrders.orders} Orders
              </Typography>
            </Paper>
            </Grid>
          </Grid>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
      

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">
                <Typography className={classes.tabHeading} variant="subtitle1">
                Customer
                </Typography>
                </TableCell>
            <TableCell align="center">
            <Typography className={classes.tabHeading} variant="subtitle1">
                Total
                </Typography>
                </TableCell>
            <TableCell align="center">
            <Typography className={classes.tabHeading} variant="subtitle1">
                Address
                </Typography>
                </TableCell>
            <TableCell align="center">
            <Typography className={classes.tabHeading} variant="subtitle1">
                Status/Delivery
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
          {rows.length > 0 ?
          rows.map((row) => (
            <Row key={row.Date} row={row} />
          )) : <Fragment />}
            <TableRow>
                      <TableCell colSpan={6}>
                      <Grid container justify="center" className={classes.buttonContainer}>
                <Grid item xs={12} className={classes.noMoreProduct}>
                <Typography variant="body2">
                    {errors.noMoreProduct && errors.noMoreProduct}
                </Typography>
                </Grid>
                      <Grid item>
            <Button
            variant="contained"
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
                      </TableCell>
                  </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>)  : 
    <Typography style={{padding: 40}} />
    }
    </React.Fragment>
    :
    <Typography style={{padding: 40}} variant="body2" color="error">
      {!consumeContext.authState.initializing &&
      "Your account has been disabled, contact support team"
      }
    </Typography>
    }
    </React.Fragment>
    :
    <Typography style={{padding: 40}} variant="body2" color="error">
     {!consumeContext.authState.initializing && "session timed out "}
     {!consumeContext.authState.initializing && (
       <Link to="/resume" >
         login again
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