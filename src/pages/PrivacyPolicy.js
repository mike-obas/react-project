import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import {Helmet} from 'react-helmet-async'
import { Paper, Typography } from '@material-ui/core';
import useStyles from "../styles/AboutUs";

function AboutUs() {
    const classes = useStyles()
    CleanUpLoader()
    return (
        <React.Fragment>
        <Helmet>
        <title>Our Privacy policies and terms</title>
        <meta name="description" content="Customer Data security and legal rights" />
      </Helmet>
        <div className="pageComponents">
        <Paper className={classes.mainContainer}>
        <div className={classes.mainTitle}>
            <Typography  variant="h4">
              PRIVACY POLICY</Typography>
            </div>
            <br />
<Typography variant="subtitle1" color="textPrimary">
This Privacy and Cookie Notice provides information on how Ntek.ng collects and processes your personal data when you visit our website.
</Typography>
<br /><br />
<Typography variant="h5">The Data We Collect About You?</Typography>
<br />
<Typography variant="subtitle1">
We collect your personal data in order to provide and continually improve our products and services. We may collect, use, store and transfer different kinds of personal data about you: for marketing and personal data optimization purposes. 
<br />
</Typography>
<br />
<Typography variant="h5">Cookies and How We Use Them</Typography>
<br />
<Typography variant="subtitle1">
A cookie is a small file of letters and numbers that we put on your computer if you agree.<br />
Cookies allow us to distinguish you from other users of our website, which helps us to provide you with an enhanced browsing experience. 
<br />
For example we use cookies for the following purposes:<br /><br />
Recognizing and counting the number of visitors and to see how visitors move around the site when they are using it 
<br />
(this helps us to improve the way our website works, for example by ensuring that users can find what they are looking for).
<br /><br />
Identifying your preferences and subscriptions e.g. language settings, saved items, items stored in your basket, and Sending you newsletters and commercial/advertising messages tailored to your interests.
<br />
</Typography>
<br />
<Typography variant="h5">How We Use Your Personal Data</Typography>
<br />
<Typography variant="subtitle1">
We use your personal data to operate, provide, develop and improve the products and services that we offer, including the following:
<br /><br />
Registering you as a new customer.<br />
Processing and delivering your orders.<br />
Managing your relationship with us.<br />
Enabling you to participate in promotions, competitions and surveys.<br />
Improving our website, applications, products and services<br />
Recommending/advertising products or services which may be of interest to you.<br />
Complying with our legal obligations, including verifying your identity where necessary. And
<br />
Detecting fraud.
</Typography>
<br /><br />
<strong>Note: All data related to payment are completely handled by our carefully selected payment endpoint, FLUTTERWAVE. Therefore, our customers are well assured of secured and reliable payment solution</strong>
<br /><br />
<Typography variant="h5">Data Security</Typography>
<br />
<Typography variant="subtitle1">
We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.<br />
In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
<br />
We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
<br />
<br />
</Typography>
<Typography variant="h5">Your Legal Rights</Typography>
<br />
<Typography variant="subtitle1">
It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.
<br />
Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct or erase your personal data, object to or restrict processing of your personal data, and unsubscribe from our emails and newsletters.
<br />
<br />
</Typography>
<Typography variant="h5">Further Details</Typography>
<br />
<Typography variant="subtitle1">
If you are looking for more information on how we process your personal data, or you wish to exercise your legal rights in respect of your personal data, please contact <strong>info@ntek.ng</strong>
</Typography>

        </Paper>
        
        </div>
        </React.Fragment>
    )
}

export default AboutUs
