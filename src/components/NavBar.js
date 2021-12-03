import React, { useContext, useState } from "react";
import { UseContext } from "../utils/UseContext";
import PageLoaderComponent from "../components/PageLoader";
import Button from "@material-ui/core/Button";
import SideMenu from "./SideMenu";
import AdminSideMenu from "./AdminSideMenu";
import UserSideMenu from "./UserSideMenu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import MenuListComposition from "./MenuItems";
import { NavLink, Link, useLocation } from "react-router-dom";
import useStyles from "../styles/AppBar";
import PageLoaderHandler from "../utils/PageLoaderHandler";
import HoverCategory from "./HoverCategory";
import {countCartItems} from '../utils/LocalStorage'
import axios from '../axiosConfig'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function PrimarySearchAppBar() {
  const classes = useStyles();
  const [showSearchBar, setShowSearchBar] = useState('none')
  const [showButton, setShowButton] = useState('block')
  const active = {
    backgroundColor: "#e67700",
  };
  const activeMobile = {
    backgroundColor: "#f2f2f2",
  };
  const location = useLocation()
  const getUrl = location.pathname;
  const newUrl = getUrl.split("/")
  const url = `/${newUrl[1]}`;
  let sideMenu = (
  <Grid item xs={1} className={classes.hideFrmDesktop}>
    <SideMenu iconType={false} />
  </Grid>)  

  let adminSideMenu = ( 
    <Grid item xs={1}>
      <AdminSideMenu iconType={false} />
    </Grid>
    )

    let userSideMenu = ( 
      <Grid item xs={1}>
        <UserSideMenu iconType={false} />
      </Grid>
      )

  let categoryMenu = (
    <Grid item xs={1} className={classes.hideFrmMobile}>
      <HoverCategory />
    </Grid>
  );

  const menuType = (url) => {
    switch (url) {
      case "/":
        return sideMenu;
      case "/user":
          return userSideMenu;
        case "/admin":
        return adminSideMenu;
      default:
        return categoryMenu;
    }
  };
  const secondMenuType = (url) => {
    switch (url) {
      case "/":
        return "";
      case "/user":
        return "";
        case "/admin":
        return "";
      default:
        return sideMenu;
    }
  };

  const adminArea = url === "/admin" ? true : false
  const consumeContext = useContext(UseContext);

  const handleSearch = (e) => {
    setShowButton('none')
    let searchTerm = e.target.value
    axios.get(`/searchProducts/${searchTerm}`)
    .then(res => {
      const searchedItems = res.data.length > 0 ? res.data : null
      const notFound =  res.data.length === 0 ? "No match found, try words that are related to electronics, appliances, equipments, or furnitures... " : null
      const content = {
        open: true,
        searchResults: searchedItems,
        noMatch: notFound,
        adminArea: adminArea
      }
      return consumeContext.setSearchModal({type: "open", modalContent: content})
    })
    .catch()
    
  }

  const handleOpenSearch = () => {
    setShowSearchBar('block')
  }
  const handleCloseSearch = () => {
    setShowSearchBar('none')
    consumeContext.setSearchModal({type: "close"})
  }

  const triggerPageLoader = PageLoaderHandler();
  const pageLoading = consumeContext.pageLoading ? <PageLoaderComponent /> : "";
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBarContainer}>
        <div>{pageLoading}</div>
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            className={`${classes.navContainer} container`}
            justify="space-between"
            alignItems="center"
            spacing={2}
            wrap="nowrap"
          >

            {menuType(url)}
            {secondMenuType(url)}

            <Grid item xs={3} md={2}>
              <Link to="/" onClick={triggerPageLoader}>
                <div
                  className={classes.siteLogo}
                >
                  
                    <img src="https://ntek.ng/images/ntek.png" alt="NTEK LOGO" />
                
                </div>
              </Link>
            </Grid>
            <Grid item xs>
              <div
                className={classes.search}
                style={{ border: "1px solid #bdbdbd" }}
              >
                <InputBase
                  placeholder="Search products, brands and categories..."
                  className={classes.inputRoot}
                  //value={searchTerm}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
                <Button
                  className={classes.button}
                  style={{ boxShadow: "none", background: showButton }}
                >
                  <SearchIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="body2"> search</Typography>
                </Button>
              </div>
            </Grid>
            <Grid item xs={1} className={classes.hideFrmMobile}></Grid>
            <Grid style={{ padding: "0px 2px 0px 2px" }}>
              <Grid
                container
                justify="flex-end"
                item
                xs={12}
                className={classes.hideFrmDesktop}
              >
                <Grid item xs={4} zeroMinWidth style={{ marginLeft: "-7px" }}>
                  <IconButton 
                  aria-label="Search products" 
                  color="inherit"
                  onClick={handleOpenSearch}
                  >
                    <SearchIcon
                      fontWeight="bold"
                      className={classes.iconWidth}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={4} zeroMinWidth style={{ marginLeft: "-6px" }}>
                  <IconButton
                    component={NavLink}
                    to="/login"
                    aria-label="user account"
                    color="inherit"
                    activeStyle={activeMobile}
                    onClick={triggerPageLoader}
                  >
                    <PermIdentityOutlinedIcon
                      fontWeight="bold"
                      className={classes.iconWidth}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={4} zeroMinWidth style={{ marginLeft: "-6px" }}>
                  <IconButton
                    aria-label="shopping cart"
                    color="inherit"
                    component={NavLink}
                    to="/cart"
                    activeStyle={activeMobile}
                    onClick={triggerPageLoader}
                  >
                    <Badge
                      badgeContent={countCartItems()}
                      color="primary"
                      max={9}
                      overlap="circle"
                    >
                      <ShoppingCartOutlinedIcon
                        fontWeight="bold"
                        className={classes.iconWidth}
                      />
                    </Badge>
                  </IconButton>
                </Grid>
              </Grid>

              <Grid
                container
                justify="flex-end"
                item
                xs={12}
                className={`${classes.hideFrmMobile} ${classes.navBtn}`}
                spacing={3}
                style={{margin: 'auto'}}
              >
                <Grid item xs={6} zeroMinWidth>
                  <MenuListComposition />
                </Grid>
                <Grid item xs={6} zeroMinWidth>
                  <NavLink
                    to="/cart"
                    activeStyle={active}
                    className={classes.navLink}
                    onClick={triggerPageLoader}
                  >
                    <Button className={classes.button}>
                      <ShoppingCartOutlinedIcon />
                      &nbsp;&nbsp;
                      <Avatar className={classes.cartAvater}>{countCartItems()}</Avatar>
                      &nbsp;&nbsp;
                      <Typography variant="body2">Cart</Typography>
                    </Button>
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <AppBar position="fixed" style={{display: showSearchBar}} className={classes.appBarContainer}>
        <Toolbar className={classes.toolbar} style={{padding: '5px 15px 5px 0px'}}>
          <Grid
            container
            className={`${classes.navContainer} container`}
            justify="space-between"
            alignItems="center"
            spacing={2}
            wrap="nowrap"
          >
          <Grid item xs={1}>
           <IconButton 
           style={{padding: 0}}
           onClick={handleCloseSearch}
           >
             <ArrowBackIcon />
           </IconButton>
              </Grid>

            <Grid item xs>
              <div
                className={classes.search}
                style={{ border: "1px solid #bdbdbd", display: 'flex' }}
              >
                <InputBase
                  placeholder="Search products..."
                  className={classes.inputRoot}
                  //value={searchTerm}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
                <Button
                  className={classes.button}
                  style={{ boxShadow: "none", background: 'none' }}
                >
                  <SearchIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="body2"> search</Typography>
                </Button>
              </div>
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />
    </div>
  );
}

export default PrimarySearchAppBar;
