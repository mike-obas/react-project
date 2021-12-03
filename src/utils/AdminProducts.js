import React, {useState, useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Formatter, Currency } from "./Currency";
import useStyles from "../styles/PlainProducts";
import { Grid, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button'
import axios from '../axiosConfig'
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import PlaceHolder from "../components/PlaceHolder";
import { useContext } from "react";
import { UseContext } from "./UseContext";
import { forceCheck } from 'react-lazyload';
import CircularProgress from '../components/CircularProgress'

function SearchProducts(props) {
    forceCheck()
   const consumeContext = useContext(UseContext);
  let {
    product: { 
      productId, category, preOrderPrice, bulkPurchaseQuan,
      productImages, productName, price, discount, stock
    }
  } = props;

  const handleCloseModal = () => {
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
  const [uid, setUid] = useState(null)
  const [actionLoading, setActionLoading] = useState(false);

  const handleProductHover = () => {
    setHovered((prev) => !prev);
  };
  const handleMousOut = () => {
    setHovered((prev) => !prev);
  };

  const handleDelete = (event) => {
    var str = event.currentTarget.value;
    var arr = str.split("-");
    setUid({category: arr[0], productId: arr[1]})
    const values = {
      open: true,
      performAction: false,
      message: `This product will be deleted permanently.`,
      actionText: 'Delete',
      cancelText: 'Cancel'
    }
    return consumeContext.setDialog({ type: "open", modalContent: values })
  }

  useEffect(() => {
    let cancel = false;
    if(consumeContext.dialog.performAction && uid){
        setActionLoading(true)
        axios.get(`/deleteProduct/${uid.category}/${uid.productId}`) 
        .then(res => {
          if (cancel) return;
          setActionLoading(false)
          consumeContext.countDispatch("increment")
          return consumeContext.setDialog({ type: "close" })
        })
        .catch(() =>  {
          setActionLoading(false)
          return consumeContext.setDialog({ type: "close" })
        })
    }
    return () => { cancel = true }
  }, [uid, consumeContext]);


  return (
    <Grid
      item
      xs={12}
      className={classes.productContainer}
      id="productContainer"
      onMouseOver={handleProductHover}
      onMouseOut={handleMousOut}
    >
      <Card className={classes.card} elevation={1}>
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
        <Grid style={{padding: '5px'}} container spacing={1}>
          <Grid item xs={6}>
                <Button 
                style={{color: '#fff', background: 'teal'}}
                variant="contained"
                fullWidth
                size="small"
                component={Link}
                to={`edit_product/${category}/${productId}`}
                onClick={handleCloseModal}
                >
                  Edit
                </Button>
          </Grid>
          <Grid item xs={6}>
                <Button 
                value={`${category}-${productId}`}
                onClick={handleDelete}
                variant="contained"
                style={{color: 'white'}}
                color="primary"
                fullWidth
                size="small"
                disabled={actionLoading}
                >
                  Delete
                  {actionLoading && <CircularProgress />}
                </Button>
          </Grid>
        </Grid>
      </Card>
     
    </Grid>
  );
}

export default SearchProducts;
