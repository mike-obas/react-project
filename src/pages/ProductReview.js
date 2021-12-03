import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import useStyles from "../styles/ProductReview";
import { Helmet } from "react-helmet-async";
import {
  Typography,
  Hidden,
  Grid,
  Divider,
  Paper,
  IconButton,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ProductReviewCarousel from "../components/ProductReviewCarousel";
import CleanUpLoader from "../utils/CleanUpLoader";
import ShareIcon from "@material-ui/icons/Share";
import { Ratings, Reviews } from "../components/Reviews";
import ReviewModal from "../components/ReviewModal";
import RecentlyViewed from "../utils/RecentlyViewed";
import { Link } from "react-router-dom";
import DeliveryAndReturns from "../components/DeliveryAndReturns"
import ProductReviewTab from "../components/ProductReviewTab";
import RelatedItems from "../components/RelatedItems";
import {OneGridSkeleton, FiveLinesTextSkeleton, OneLineTextSkeleton} from '../utils/ProductSkeleton'
import axios from '../axiosConfig'
import {
  PricingInfo,
  BrandName,
  ProductName,
  Description
} from "../components/ProductUnderReview";
import CircularProgress from '../components/CircularProgress';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import BreadCrumb from '../components/BreadCrumb'
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import { Currency, Formatter } from "../utils/Currency";
import firebase from 'firebase/app'
import 'firebase/auth'


function ProductReview() {
  const classes = useStyles();
  const initialRatings = {
    //pass zero values if document does'nt exists
    ratingsCount: 0,
    ratingsSum: 0,
  };
  const consumeContext = useContext(UseContext);
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [ratings, setRatings] = useState(initialRatings)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [promo, setPromo] = useState(null)
  const { category, productId } = useParams();
  const [lastId, setLastId] = useState(null)
  const [errors, setErrors] = useState({})
  CleanUpLoader();

  useEffect(() => {
    let cancel = false;
    async function fetchData(){
      //setErrors({})
      setProduct(null)
      //get product for review
    await axios.get(`/eachProduct/${category}/${productId}`)
      .then(res => {
        if (cancel) return;
        setProduct(res.data)
      })
      .catch();
      //get ratings values
      await axios.get(`/getRatingsValues/${category}${productId}`)
      .then(res => {
        if (cancel) return;
        setRatings(res.data)
      })
      .catch();
      //get promo
      await axios.get(`/singleQuery/promo/registration`)
      .then(res => {
        if(res.data.promoAmount !== null && !isNaN(res.data.promoAmount))
       { return setPromo(res.data)}
       return;
      })
      .catch()
      }
      fetchData()
      return () => { cancel = true; }
}, [category, productId, consumeContext.countState])

useEffect(() => {
  let cancel = false;
  setErrors({})
  setReviews(null)
  //get firstbatch of reviews
  axios.get(`/firstBatchReviews/${category}${productId}`)
  .then(res => {
    if (cancel) return;
      setLastId(res.data[0])
      let newReviews = res.data
      newReviews.shift()
    setReviews(newReviews)
  })
  .catch(err => {
    setErrors(err.response.data)
  });
  return () => { cancel = true }
  // eslint-disable-next-line
}, [ category, productId, consumeContext.countState ])

const handleGetMore = () => {
  setButtonLoading(true);
  axios.get(`/moreReviews/${category}${productId}/${lastId}`)
  .then(res => {
      setLastId(res.data[0])
      let newReviews = res.data
      newReviews.shift()
      setReviews([...reviews, ...newReviews])
    setButtonLoading(false)
  })
  .catch(err => {
      setErrors(err.response.data)
      setButtonLoading(false)
  });
}

  const url = window.location.pathname;
  const title = window.document.title;
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: `https://ntek.ng${url}`,
        });
        // .then()
        // .catch();
    } else {
      window.location("https://facebook.com/ntek");
    }
  };

  const ratingsValue = ratings && <Ratings ratings={ratings} />;
  const markedUpReviews = reviews ? (
    reviews.map((review, index) => <Reviews review={review} key={index} />)
  ) : (
    <OneGridSkeleton />
  );

  let recentImagesMarkUp = product ? 
    <ProductReviewCarousel imageInfo={product} />
   : 
    <OneGridSkeleton />
  ;

  let markedUpPricingInfo = product ? 
  <PricingInfo eachProduct={product} /> : <OneLineTextSkeleton />;

  let markedUpBrandName= product ? 
  <BrandName eachProduct={product} /> : <OneLineTextSkeleton />;

  let markedUpProductName= product ? 
  ProductName(product) : <OneLineTextSkeleton />;
  let seoName= product ? 
  ProductName(product) : 'product review';
  let titleName = seoName.slice(0, 50);
  
  let markedUpDescription= product ? 
  Description(product) : <FiveLinesTextSkeleton />;
  const metaDescription = product && markedUpDescription.slice(0, 120);

  let ogTitle = seoName.slice(0, 30);
  let ogUrl = `ntek.ng${url}?nocache`;
  let ogDescription = product && markedUpDescription.slice(0, 50);
  let ogImage = product && `${product.productImages[0]}`;


   const productDetails = (<div>
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
      </Grid>
    </Grid>
    {markedUpDescription}
  </div>)
  
  const deliveryAndReturns = (<div>
    <Grid
      container
    >
      <Grid item xs={12}>
      <DeliveryAndReturns />
      </Grid>
    </Grid>
  </div>)

   const customerFeedback = (
     <div>
   <div>
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={8}>
        <Typography variant="body1">
          ({ratings.ratingsCount === 0 && `no reviews yet`}
          {ratings.ratingsCount === 1 &&
            `${ratings.ratingsCount} review`}
          {ratings.ratingsCount > 1 &&
            `${ratings.ratingsCount} reviews`}
          )
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2" component="div">
          <ReviewModal icon="bigIcon" />
        </Typography>
      </Grid>
    </Grid>
    <Divider className={classes.divider} />
    {!errors.noReview && markedUpReviews}

    {!errors.noReview &&
    <Grid container justify="center" className={classes.buttonContainer}>
                <Grid item xs={12} className={classes.noMoreProduct}>
                <Typography variant="body2">
                    {errors.noMoreReview && errors.noMoreReview}
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
        More reviews
        </Typography>
    </Button>
    </Grid>
            </Grid>
    }
  </div> 

    { errors.noReview && 
      <div style={{height: '150px', width: '100%', padding: '20px 10px'}}>
        <Typography variant="h6">
          {errors.noReview}
        </Typography>
      </div>
    }
    </div>

  )

const tabItems = {
  productDetails,
  deliveryAndReturns,
  customerFeedback
}
const onlyTwoTabItems = {
  productDetails,
  deliveryAndReturns,
  customerFeedback,
  onlyTwoItems: true
}
let productName = product && decodeURIComponent(product.productName);
// eslint-disable-next-line
let categoryText = category.replace(/[\_]/g, "\ ")
const breadCrumbValues = {
  productName: productName,
  category: category, 
  categoryText: categoryText
}

  return (
    <React.Fragment>
      <Helmet>
        <title>{titleName}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={titleName} />
      </Helmet>
      <div
        className="container pageComponents"
      >
        <BreadCrumb values={breadCrumbValues} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <div className={classes.productWrapper}>
              <Grid container justify="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Paper className={classes.productArea}>
                    <Grid container justify="flex-start" spacing={3}>
                      <Grid item xs={12} sm={6} md={5}>
                        {recentImagesMarkUp}
                        <Hidden xsDown>
                          <Divider className={classes.divider} />
                          <Typography variant="subtitle1">
                            <span className={classes.shareText}>
                              SHARE PRODUCT
                            </span>
                            <br />
                            <IconButton
                              onClick={handleShare}
                              className={classes.iconContainer}
                            >
                              <ShareIcon className={classes.icon} />
                            </IconButton>
                          </Typography>
                        </Hidden>
                      </Grid>
                      <Grid item xs={12} sm={6} md={7}>
                        <Grid container alignItems="baseline">

                          <Grid item xs={6}>
                            <Typography
                              variant="subtitle2"
                              className={classes.brandContainer}
                            >
                              <span className={classes.brand}>{markedUpBrandName}</span>
                            </Typography>
                          </Grid>

                          <Grid item xs={6} className={classes.shareMobile}>
                            <IconButton
                              onClick={handleShare}
                              className={classes.iconContainer}
                            >
                              <ShareIcon className={classes.icon} />
                            </IconButton>
                          </Grid>
                        </Grid>

                        <Typography
                          variant="h6"
                          className={classes.productName}
                        >
                          {markedUpProductName}
                        </Typography>

                        <div>{ratingsValue}</div>

                        <Divider className={classes.divider} />

                        {markedUpPricingInfo}
                        
                        <Divider className={classes.divider} />
                        { promo && (<div>
                          <Typography variant="subtitle1">PROMO</Typography>
                          <Link to="/signup" className="coloredLink">
                            <Typography variant="body2">
                              Register and get &nbsp;
                              {promo && Currency.naira}
                              {promo && Formatter(promo.promoAmount)}&nbsp; 
                              discount on your first order
                              that is above &nbsp;{promo && Currency.naira}
                              {promo && Formatter(promo.minOrderAmount)}
                            </Typography>
                          </Link>
                        </div>)}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper>
                    <Hidden smDown>
                    <ProductReviewTab  productTabItems={onlyTwoTabItems} />
                    </Hidden>
                    <Hidden mdUp>
                  <ProductReviewTab productTabItems={tabItems} />
                  </Hidden>
                  </Paper>
                </Grid>

              </Grid>
            </div>
          </Grid>
          <Grid item md={3} className={classes.deliveryAndReturns}>
            <div className={classes.deliveryArea}>
              <Paper className={classes.productArea}>
                <DeliveryAndReturns />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
      <RelatedItems product={{category: category}} />
      <RecentlyViewed />
    </React.Fragment>
  );
}

export default ProductReview;
