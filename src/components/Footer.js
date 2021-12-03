import React, { useEffect, useState } from "react";
import { Grid, IconButton, Button, Divider, Hidden } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import clsx from 'clsx'
import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";
import { loadCSS } from "fg-loadcss";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "../styles/Footer";
import FindInFast from "./FindInFast";
import AlertModal from "../utils/AlertModal";
import DialogModal from "../utils/DialogModal"
import SearchModal from "../utils/SearchModal"
import axios from '../axiosConfig'
import CircularProgress from "./CircularProgress";
import { useContext } from "react";
import { UseContext } from "../utils/UseContext";
import { checkSubscriber } from '../utils/checkInputs';


function Footer() {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const [formInput, setFormInput] = useState({email: ''})
  const consumeContext = useContext(UseContext)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const inputHandler = (e) => {
    setErrors(null)
    setFormInput({email: e.target.value.trim()})
  }
  const handleSubscribe = (e) => {
    e.preventDefault()
    const {valid, checkErrors} = checkSubscriber(formInput);
        if(!valid) {
          return setErrors(checkErrors);
        }
    setButtonLoading(true)
    axios.post("/insertSubscriber", formInput)
    .then(res => {
      let modalContent = {
        open: true,
        message: res.data.message,
        successLink: "",
        successLinkText: '',
        cancelText: 'okay'
        }
        setFormInput({ email: ""});
        setButtonLoading(false)
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
    })
    .catch()
  }

  return (
    <div className={classes.footerWrapper}>
      <SearchModal />
      <AlertModal />
      <DialogModal />
      <div className={classes.newsLetterArea}>
        <div className={classes.newsLetterinnerWrapper}>
          <Grid container justify="center" spacing={2} alignItems="center">
            <Grid
              item
              container
              xs={12}
              sm={6}
              spacing={2}
              className={clsx(classes.subscribeInput, classes.hideFrmMobile)}
            >
              <Hidden mdUp>
              <Grid item xs={2}>
                
                <IconButton style={{ padding: 0 }}>
                  <TelegramIcon className={classes.subscribeIcon} />
                </IconButton>
              </Grid> 
              </Hidden>
              <Grid item xs={10} container className={classes.subscribeTextArea}>
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.subscribeText}>
                    Subscribe to our newsletter.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    className={classes.subscribeText}
                  >
                    Get updates on latest products and offers
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className={classes.search}>
                <InputBase
                  placeholder="Enter your email address"
                  className={classes.inputRoot}
                  inputProps={{ "aria-label": "search" }}
                  value={formInput.email}
                  onChange={inputHandler}
                />
                <Button
                  className={classes.button}
                  style={{ boxShadow: "none" }}
                  onClick={handleSubscribe}
                  disabled={buttonLoading}
                >
                   { buttonLoading && ( <CircularProgress /> ) }
                  <Typography variant="body2"> Subscribe</Typography>
                </Button>
              </div>
              {
                   errors &&
                  <Typography>{errors.email}</Typography>
                  }
            </Grid>
            {/* </Grid> */}
          </Grid>
        </div>
      </div>
      <div className={`${classes.mainFooter} container`}>
        <div className={classes.wrapMainFooter}>
          <Grid container spacing={5}>
            <Grid container item xs={12} sm={6} md={3}>
              <Hidden smDown>
                <Grid item xs={12}>
                  <div className={classes.footerImageContainer}>
                    <img src="https://ntek.ng/images/ntek.png" alt="NTEK LOGO" />
                  </div>
                </Grid>
              </Hidden>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  className={classes.subscribeText}
                >
                  Reach us, We are always available.
                </Typography>
                <Typography variant="h6" className={classes.contactText}>
                  <IconButton color="primary" className={classes.iconButton}>
                    <CallIcon />
                  </IconButton>
                  <a className="routerLink" href="tel: +2348101463724">
                    08101463724
                  </a>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.contactText}>
                  <IconButton color="primary" className={classes.iconButton}>
                    <WhatsAppIcon />
                  </IconButton>
                  <a className="routerLink" href="https://wa.me/+2348101463724">
                    08101463724
                  </a>
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <IconButton className={classes.iconButton}>
                    <a href="https://www.facebook.com/100068328626248" className="routerLink">
                      <FacebookIcon className={classes.socialIcon} />
                    </a>
                  </IconButton>
                  <IconButton>
                    <a
                      href="https://www.instagram.com/ntek.ng"
                      className="routerLink"
                    >
                      <InstagramIcon className={classes.socialIcon} />
                    </a>
                  </IconButton>
                  <IconButton>
                    <a href="mailto: support@ntek.ng" className="routerLink">
                      <EmailIcon className={classes.socialIcon} />
                    </a>
                  </IconButton>
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" className={classes.addressText}>
                <span style={{color: '#e67700'}}> Head Quarters:</span> Corporate office B417, Alaba international market, Ojo. Lagos, Nigeria
                </Typography>
                <Typography variant="subtitle2" className={classes.addressText}>
                  <span style={{color: '#e67700'}}>Branch Office:</span> Shop 14 Ground floor Reco plaza complex, Opposite MTN office by sunny bus stop along ojo. Alaba intl market road, Ojo. Lagos
                </Typography>
                <div style={{height: 10}}></div>
                <a 
                href="/address"
                className="coloredLink"
                >
                  View on map
                </a>
              </Grid>
            </Grid>
            <Hidden xsDown>
              <FindInFast />
            </Hidden>
          </Grid>
        </div>
      </div>

      <Hidden smUp>
        <Grid item xs={12} md={9} style={{ marginTop: 30 }}>
          <Accordion elevation={0} style={{borderRadius: 0}} className={classes.mobileQuickActions}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="quick-actions"
              id="quick-header"
            >
              <Typography variant="h5" className={classes.accordionHeading}>
                Quick Actions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <FindInFast />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Hidden>

      <div className={classes.footerBase}>
        <div className="container">
          <div className={classes.innerFooterBase}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  &copy;{currentYear} <strong>Ntek.</strong> All Rights Reserved
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <IconButton
                  className="fab fa-cc-visa"
                  style={{
                    fontSize: 30,
                    color: "#000000",
                    padding: "0px 8px 0px 0px",
                  }}
                />
                <IconButton
                  className="fab fa-cc-mastercard"
                  style={{
                    fontSize: 30,
                    color: "#000000",
                    padding: "0px 8px 0px 0px",
                  }}
                />
                <IconButton
                  className="fas fa-credit-card "
                  style={{
                    fontSize: 30,
                    color: "#000000",
                    padding: 0,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
