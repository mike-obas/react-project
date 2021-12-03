import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px 2px 0px',
    display: 'none',
    [theme.breakpoints.up("md")]: {
      display: 'block',
      paddingTop: '8px',
    }
  },
  categoryText: {
    textTransform: 'capitalize'
  }
}));

export default function CustomSeparator(props) {
  const classes = useStyles();
  const { values: { productName, category, categoryText }} = props;

  return (
    <div className={classes.root}>
     <Breadcrumbs maxItems={2} separator="›" aria-label="ntek electronics">
        <Link className="routerLink" to="/">
          Home
        </Link>
        <Link 
        className="routerLink" 
        to={`/${category}`}
        >
          <Typography className={classes.categoryText} >
          {categoryText}
          </Typography>
        </Link>
        <Typography color="textPrimary">{productName}</Typography>
      </Breadcrumbs>
    </div>
  );
}