import React from 'react'
import List from "@material-ui/core/List"
import { Grid, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import PageLoaderHandler from "../utils/PageLoaderHandler";
import useStyles from '../styles/Footer';

function FindInFast() {
    const classes = useStyles()
    const triggerPageLoader = PageLoaderHandler();
    const categories = [
        {
          text: "Televisions",
          link: "televisions",
        },
        {
          text: "Musical System",
          link: "musical_system",
        },
        {
          text: "Blenders",
          link: "blenders",
        },
        {
          text: "Work Tables",
          link: "work_tables",
        },
        {
          text: "Commercial Oven",
          link: "commercial_oven",
        },
        {
          text: "Solar System",
          link: "solar_system",
        },
      ];
      const quickLinks = [
        {
          text: "About Us",
          link: "about_us",
        },
        {
          text: "Sign Up",
          link: "signup",
        },
        {
          text: "Ntek Stores",
          link: "eltak",
        },
        {
          text: "Bulk Purchase",
          link: "bulk_purchase",
        },
        {
          text: "Preorder",
          link: "preorder",
        },
        {
          text: "Shipping policy",
          link: "shipping",
        },
      ];
      const brands = [
        {
          text: "Eltak",
          link: "eltak",
        },
        {
          text: "Haier Thermocool",
          link: "haier_thermocool",
        },
        {
          text: "Hisense",
          link: "hisense",
        },
        {
          text: "LG",
          link: "lg",
        },
        {
          text: "Samsung",
          link: "samsung",
        },
        {
          text: "Elepaq",
          link: "elepaq",
        },
      ];
    return (
        <React.Fragment>
            <Grid item xs={12} sm={6} md={3}>
              <List>
                <Typography variant="subtitle2" className={classes.title}>
                  TOP LINKS
                </Typography>
                {quickLinks.map((quickLink) => (
                  <ListItem
                    key={quickLink.link}
                    className={`${classes.listItem} routerLink`}
                    component={Link}
                    to={`/${quickLink.link}`}
                    onClick={triggerPageLoader}
                  >
                    <ListItemText primary={quickLink.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <List>
                <Typography variant="subtitle2" className={classes.title}>
                  CATEGORIES
                </Typography>
                {categories.map((category) => (
                  <ListItem
                    key={category.link}
                    className={`${classes.listItem} routerLink`}
                    component={Link}
                    to={`/${category.link}`}
                    onClick={triggerPageLoader}
                  >
                    <ListItemText primary={category.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <List>
                <Typography variant="subtitle2" className={classes.title}>
                  BRANDS
                </Typography>
                {brands.map((brand) => (
                  <ListItem
                    key={brand.link}
                    className={`${classes.listItem} routerLink`}
                    component={Link}
                    to={`/${brand.link}`}
                    onClick={triggerPageLoader}
                  >
                    <ListItemText primary={brand.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
        </React.Fragment>
    )
}

export default FindInFast
