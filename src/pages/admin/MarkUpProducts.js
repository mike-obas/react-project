import React, {useState, useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Formatter, Currency } from "../../utils/Currency";
import useStyles from "../../styles/PlainProducts";
import { Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import PlaceHolder from "../../components/PlaceHolder";
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import CircularProgress from '../../components/CircularProgress'
import axios from '../../axiosConfig'

function CategoryProducts(props) {
  let {
    product: { 
      productId, category, preOrderPrice, bulkPurchaseQuan,
      productImages, productName, price, discount, stock
    }
  } = props;

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
  const consumeContext = useContext(UseContext)
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

  const handleDelete = (event) => {
    setUid(null)
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
      <Card className={classes.card} elevation={2}>
        <Link to={`/product_review/${category}/${resolvedUrlName}/${productId}`} className="routerLink"
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
        <Grid style={{padding: '5px'}} container spacing={1}>
          <Grid item xs={6}>
                <Button 
                style={{color: '#fff', background: 'teal'}}
                variant="contained"
                fullWidth
                size="small"
                component={Link}
                to={`edit_product/${category}/${productId}`}
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
        {(discountPercentage !== '') &&
         <Typography variant="caption" className={classes.offerType}>
           {discountPercentage}
           </Typography>
           }
    </Grid>
  );
}

export default CategoryProducts;
