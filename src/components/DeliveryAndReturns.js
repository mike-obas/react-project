import React from 'react'
import { Link } from "react-router-dom";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import { Currency } from "../utils/Currency";
import {
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import useStyles from '../styles/ProductReview';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

function DeliveryAndReturns() {
    const classes = useStyles()
    return (
        <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                        className={classes.infoIcon}
                        >
                          <IconButton style={{ padding: 0 }}>
                            <LocalShippingOutlinedIcon 
                            fontSize="large" 
                            className={classes.darkIcon} 
                            />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography 
                        variant="subtitle2"
                        className={classes.infoHeading}
                        >
                          DELIVERY
                          </Typography>
                        <Typography variant="caption">
                          For light items, delivery is free within lagos and 
                          &nbsp;<strong>{Currency.naira}2,000</strong> for other states. Delivery fee shall be negotiated upon order placement for heavy items.
                          Delivery takes 24hrs within lagos, 48hrs - 72hrs for western, southern & north-central states and takes 3 - 4days for core-nothern states.
                          <Link 
                          to="/shipping"
                          className="coloredLink"
                          >
                            &nbsp;read more
                            </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.noBottomDivider} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                        className={classes.infoIcon}
                        >
                          <IconButton style={{ padding: 0 }}>
                            <LoopOutlinedIcon 
                            fontSize="large" 
                            className={classes.darkIcon}
                            />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography 
                        variant="subtitle2"
                        className={classes.infoHeading}
                        >
                          RETURN POLICY
                          </Typography>
                        <Typography variant="caption">
                        Free return within 7 days for eligible items
                          <Link 
                          to="/shipping"
                          className="coloredLink"
                          >
                            &nbsp;read more
                            </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.noBottomDivider} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                        className={classes.infoIcon}
                        >
                          <IconButton style={{ padding: 0 }}>
                            <PaymentOutlinedIcon 
                            fontSize="large" 
                            className={classes.darkIcon}
                            />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography 
                        variant="subtitle2"
                        className={classes.infoHeading}
                        >
                          PAYMENT METHODS
                          </Typography>
                        <Typography variant="caption">
                        Online payment, Bank deposit/tranfer and
                        Payment on delivery.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.noBottomDivider} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                        className={classes.infoIcon}
                        >
                          <IconButton style={{ padding: 0 }}>
                            <DynamicFeedOutlinedIcon 
                            fontSize="large" 
                            className={classes.darkIcon}
                            />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography 
                        variant="subtitle2"
                        className={classes.infoHeading}
                        >
                          CUSTOMER FEEDBACK
                          </Typography>
                        <Typography variant="caption">
                        <strong>100%</strong> cutomers feedbak
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.noBottomDivider} />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                        className={classes.infoIcon}
                        >
                          <IconButton style={{ padding: 0 }}>
                            <LocalOfferOutlinedIcon 
                            fontSize="large" 
                            className={classes.darkIcon}
                            />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography 
                        variant="subtitle2"
                        className={classes.infoHeading}
                        >
                          QUALITY
                          </Typography>
                        <Typography variant="caption">
                        Our products are sourced directly from reputable manufacturers
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>



                </Grid>
    )
}

export default DeliveryAndReturns
