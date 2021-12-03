import React from "react";
import CleanUpLoader from "../utils/CleanUpLoader";
import { Helmet } from "react-helmet-async";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "../styles/AboutUs";

function Shipping() {
  const classes = useStyles();
  CleanUpLoader();
  return (
    <React.Fragment>
      <Helmet>
        <title>Ntek Technologies Nigeria</title>
        <meta
          name="description"
          content="Outlet for quality electronics and equipments"
        />
      </Helmet>
      <div className="pageComponents">
        <Paper className={classes.mainContainer}>
        <div className={classes.mainTitle}>
            <Typography  variant="h4">
              ABOUT US</Typography>
            </div>
            <br />
            <Typography variant="subtitle1">
          N-tek Technologies, formerly Joechino Investment Nig. Ltd, has been in
          the business of marketing, sales, and supply of various electronics
          products for over a decade, and also into industrial kitchen
          equipment. <br />
          We have a profound experience and in-depth knowledge in the
          industries and that has enabled us establish ourself as a renowned
          entity by delivering quality and cost effective Electronics and
          Industrial Kitchen equipment. <br /><br />
          We are actively involved in supplying
          of Cooking Equipment, Bakery Equipment, Cold Storage Equipment, and so
          on, We aim at providing high-quality electronics and commercial
          catering equipment to catering businesses, hotels, offices, homes etc.
          <br /><br />
          We source our products from reputable companies in China who also
          produce for other bigger brands with C.E certification because we
          firmly believe in the notion that quality is important for growth; and
          customer satisfaction has always been amongst the cardinal objectives
          of our company. All our products are tested under various quality
          parameters.  
          <br /><br />
          Our showrooms are open to customers, and we stock items
          to suit most budgets and will recommend only products to suit your
          needs. Our highly trained staffs and technicians are constantly
          working to meet the customers satisfaction. For past years, we have
          enjoyed great reputations, rapid corporate growth and stable customer
          retention rate. We sincerely look forward to working closely with you.
          </Typography>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default Shipping;
