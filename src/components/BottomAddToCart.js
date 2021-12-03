import React from "react";
import useStyles from "../styles/ProductReview";
import { Grid } from "@material-ui/core";

function BottomAddToCart(props) {
  const {
    items: { priceMarkUp, addToCart },
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.bottomAddToCart}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={4} className={classes.amountContainer}>
          <div
          className={classes.bottomPrice}
          >
            <span className={classes.bottomNavAmount}>
            {priceMarkUp}
            </span>
            </div>
        </Grid>
        <Grid item xs={8} className={classes.buttonContainer}>
          <div
            className={classes.bottomCartButton}
          >
              {addToCart}
        </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default BottomAddToCart;
