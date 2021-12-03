import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../styles/ProductReview';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function ProductReviewTab(props) {
    const {
        productTabItems : {productDetails, deliveryAndReturns, customerFeedback, onlyTwoItems}
    } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabPanels = onlyTwoItems ? (<Fragment>
  <TabPanel value={value} index={0}>
    { productDetails }
  </TabPanel>
  <TabPanel value={value} index={1}>
    { customerFeedback }
  </TabPanel>
  </Fragment>) : (<Fragment>
  <TabPanel value={value} index={0}>
        { productDetails }
      </TabPanel>
      <TabPanel value={value} index={1}>
        { deliveryAndReturns }
      </TabPanel>
      <TabPanel value={value} index={2}>
        { customerFeedback }
      </TabPanel>
      </Fragment>);

    const tabs = onlyTwoItems ? 
    (
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          scrollButtons="auto"
          aria-label="product details, reviews, delivery and return policy"
        >
         <Tab label="Product Details" {...a11yProps(0)} className={classes.tabTitle} />
          <Tab label="Customer Feedback" {...a11yProps(1)} className={classes.tabTitle} />
          </Tabs>) :
           (<Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="mobile product details, reviews, delivery and return policy"
        >
        <Tab label="Details" {...a11yProps(0)} className={classes.tabTitle} />
          <Tab label="Delivery & Returns" {...a11yProps(1)} className={classes.tabTitle} />
          <Tab label="Feedback" {...a11yProps(2)} className={classes.tabTitle} />
    </Tabs>)

  return (
    <div className={classes.productReviewTab}>
      <AppBar position="static" className={classes.reviewTabAppBar}>
          {tabs}
      </AppBar>
      {tabPanels}
    </div>
  );
}
export default ProductReviewTab