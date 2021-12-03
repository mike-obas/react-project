import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LiveTvRoundedIcon from "@material-ui/icons/LiveTvRounded";
import KitchenRoundedIcon from "@material-ui/icons/KitchenRounded";
import SpeakerRoundedIcon from "@material-ui/icons/SpeakerRounded";
import SpeakerGroupRoundedIcon from "@material-ui/icons/SpeakerGroupRounded";
import MusicNoteRoundedIcon from "@material-ui/icons/MusicNoteRounded";
import WbIncandescentRoundedIcon from "@material-ui/icons/WbIncandescentRounded";
import OutdoorGrillRoundedIcon from "@material-ui/icons/OutdoorGrillRounded";
import FireplaceRoundedIcon from "@material-ui/icons/FireplaceRounded";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import TableChartIcon from "@material-ui/icons/TableChart";
import { Link } from "react-router-dom";
import PageLoaderHandler from "../utils/PageLoaderHandler";
import useStyles from "../styles/DisplayArea";
// import { useTheme  } from '@material-ui/core/styles'
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";

function DesktopCategory(props) {
  const {menuClickCategory} = props
  const triggerPageLoader = PageLoaderHandler();
  const classes = useStyles();
  const [show, setShow] = useState(0);
  const handleScrollTop = async () => {
    let firstCategory = document.getElementById("firstCategory");
    firstCategory.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    setShow(0)
  };
  const handleScrollDown = () => {
    let lastCategory = document.getElementById("lastCategory");
    lastCategory.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setShow(1);
  };
  return (
    <div className={classes.paperContainer}>
      <Paper 
      elevation={1} 
      className={`${classes.category}`}
      style={{paddingTop: `${menuClickCategory ? '208%' : '185%'}`}}
      >
      <Paper elevation={0} className={classes.mainCategory}>
          <div style={{ display: `${show === 0 && !menuClickCategory ? "block" : "none"}` }}>
            <Zoom in={true} unmountOnExit>
              <Fab
                onClick={handleScrollDown}
                aria-label="scroll to bottom"
                size="small"
                className={classes.categoryScrollFab}
              >
                <DownIcon />
              </Fab>
            </Zoom>
          </div>

          <div id="firstCategory" className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/televisions"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <LiveTvRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Televisions
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/refrigerators"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <KitchenRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Refrigerators
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/home_theatre"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <SpeakerRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Home Theatre
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/musical_system"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <MusicNoteRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Musical System
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/public_address_system"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <SpeakerGroupRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Public Address System
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/solar_system"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <WbIncandescentRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Solar System
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/commercial_oven"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <FireplaceRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Commercial Oven
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/commercial_cookers"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <OutdoorGrillRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Commercial Cookers
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/microwave_oven"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <FireplaceRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Microwave Oven
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/blenders"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <LocalDrinkIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Blenders
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/deep_fryers"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <FireplaceRoundedIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Deep Fryers
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/mixers"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <LocalDrinkIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Mixers
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.eachCategory}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/work_tables"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <TableChartIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Work tables
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div 
          id="lastCategory" 
          style={{position: 'relative'}}
          >
          <div 
          className={classes.eachCategory}
          >
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              spacing={2}
              component={Link}
              to="/kitchen_rack"
              className="routerLink"
              onClick={triggerPageLoader}
            >
              <Grid item>
                <DeveloperBoardIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="body2" noWrap>
                  Kitchen Rack
                </Typography>
              </Grid>
            </Grid>
          </div>

          <div style={{ display: `${show === 1 && !menuClickCategory ? "block" : "none"}` }}>
            <Zoom in={true} unmountOnExit>
              <Fab
                onClick={handleScrollTop}
                aria-label="scroll to Top"
                size="small"
                className={classes.categoryScrollFab}
              >
                <UpIcon />
              </Fab>
            </Zoom>
          </div>

          </div>
        </Paper>
      </Paper>
    </div>
  );
}

export default DesktopCategory;
