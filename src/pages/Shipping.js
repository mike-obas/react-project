import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import {Helmet} from 'react-helmet-async'
import { Paper, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import useStyles from "../styles/AboutUs";

function AboutUs() {
    const classes = useStyles()
    CleanUpLoader()
    return (
        <React.Fragment>
        <Helmet>
        <title>Our shipping and delivery terms</title>
        <meta name="description" content="Fast and reliable shipping" />
      </Helmet>
        <div className="pageComponents">
        <Paper className={classes.mainContainer}>
        <div className={classes.mainTitle}>
            <Typography  variant="h4">
              DELIVERY TERMS</Typography>
            </div>
            <br />
<Typography variant="subtitle1" color="textPrimary">
If you have an inquiry for an existing order, please reply to your order confirmation email.
<br />
If you have a support inquiry, please message us at <strong>support@ntek.ng</strong>
<br />
Please read the following information carefully to ensure that you are fully aware of the shipping constraints within your region.
</Typography>
<br />
<Typography variant="h5">Delivery estimates</Typography>
<Typography variant="subtitle1">
Delivery takes <strong>24hrs</strong> within lagos, <strong>48hrs - 72hrs</strong> for western, southern & north-central states and takes <strong>3 - 4days</strong> for core-nothern states.
<br />
Time estimates for pre-order is stated along side the product.
<br /><br />
If you need to delay the delivery of your purchased product, please contact our Support team ASAP. Once your product is moved, We are unable to delay the delivery, so it's important we know your needs as soon as possible to ensure your item is shipped at a convenient time.
<br />
<strong>Please note, that these time frames are dependent on what time the order was placed and, can fluctuate during peak sales periods and holidays.
</strong>
<br />
</Typography>
<br />
<Typography variant="h5">Delivery Fee</Typography>
<Typography variant="subtitle1">
For light items, delivery is free within lagos state and  ₦2,000 for other states.
<br /> 
<strong>Note: Delivery fee shall be negotiated upon order placement for heavy items.</strong>
</Typography>
<br />
<Typography variant="h5">Delivery Services</Typography>
<Typography variant="subtitle1">
We process most of our deliveries through GIGM, DHL, COURIERPLUS,  REDSTAR Delivery Couriers. As a marketplace, our featured sellers have the option of making deliveries via other reputable couriers or delivering your order to you themselves.
</Typography>
<br /><br />
<Typography variant="h5">Frequently asked Questions</Typography>
<br />
<Typography variant="subtitle1">
1. <strong>Can I place an order and receive it the same day?</strong>
<br />
Answer: Yes you can. However, this depends on the product ordered and the location for delivery.
<br /><br />
2. <strong>Can I pay on delivery?</strong>
<br />
Answer: Yes you can! But a confirmation call will be placed across 
to you before your order(s) can be shipped.
<br /><br />
3. <strong>How will I be sure that my payment information are safe and not saved on your site?</strong> <br />
Answer: All payments and Payment information are Highly secured by Flutterwave endpoint. For more details, check out our.
<Link to="/policy" className="coloredLink"> privacy policy</Link>
<br /><br />
5. <strong>Can my Orders be Delivered to me on Sundays?</strong>
<br />
Answer: No! But you can place orders on our site at anytime.
<br /><br />
</Typography>
<Typography variant="subtitle1">
<strong>Note: Shipping times may vary due to seasonal volume, weather, and, for customs/duty processing for international deliveries
</strong>
          </Typography>
        </Paper>
        <Paper className={classes.mainContainer}>
            <Typography variant="h3">RETURN POLICY</Typography>
            <br />
<Typography variant="subtitle1" color="textPrimary">
Our return policy helps you stay covered in case of defects in material, design and workmanship after purchase of our product(s).
<br /><br />
If you purchase a product on our website and you are not  satisfied with the product for any reason within 7 days of receipt of purchase. We have a 7-day return policy for physical items, which means you have 7 days after receiving your item to request a return.
<br /><br />
To be eligible for a return, the item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
<br /><br />
To start a return, you can contact us at support@ntek.ng. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
You can always contact us for any return question at 
<strong> 08144444443</strong>
</Typography>
<br />
<Typography variant="h5">Damages and Issues</Typography>
<Typography variant="subtitle1">
Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
</Typography>
<br />
<Typography variant="h5">Exceptions / Non-returnable Items</Typography>
<br />
<Typography variant="subtitle2">
<strong>Returns or replacements may not be available in the following cases, and not limited to:</strong>
</Typography>
<br />
<Typography variant="subtitle1">
1. Damages due to misuse of the product.<br />
2. Any consumable item which has been used or installed.<br />
3. Products with tampered or missing serial / UPC numbers.<br />
4. Any damage/defect which is not covered under the manufacturer's warranty.<br />
5. Any product that is returned without all original packaging and accessories, including the box, manufacturer's packaging if any, and all other items originally included with the product(s) delivered.<br />
6. Items with No Returns policy.
</Typography>
<br />
<Typography variant="subtitle1">
<strong>Note: Exchanges and refunds maybe possible. This is determined based on the state of the item(s) returned
</strong>
          </Typography>
        </Paper>
        </div>
        </React.Fragment>
    )
}

export default AboutUs
