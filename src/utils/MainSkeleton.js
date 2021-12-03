import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/Skeleton";
import { Card } from "@material-ui/core";

function HomeSkeleton() {
  const classes = useStyles();
  const component = (
    <Grid item xs={6} sm={4} md={2}>
      <Skeleton animation="wave" variant="rect" width={"100%"} height={118} />
      <Skeleton animation="wave" variant="text" height={12} width={"100%"} />
      <Skeleton animation="wave" variant="text" height={12} width={"60%"} />
    </Grid>
  );
  const skeletons = [];

  for (let index = 0; index < 6; index++) {
    skeletons.push(component);
  }
  //quick Links
  const quickLinks = (
    <Grid item xs={4} md={2}>
        <Card className={classes.card}>
        <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} md={3}>
      <Skeleton 
      animation="wave" 
        variant="circle" 
        width={40} height={40} 
        className={classes.auto}
        />
      </Grid>
      <Grid item xs={12} md={9}>
      <Skeleton
      className={classes.auto}
        animation="wave"
        variant="text"
        width={"90%"}
        height={10}
      />
      </Grid>
    </Grid>
    </Card>
    </Grid>
    
  );
  const frames = [];
  for (let index = 0; index < 6; index++) {
    frames.push(quickLinks);
  }

  const categories = (
    <Grid item md={12}>
      <Skeleton
        animation="wave"
        variant="text"
        width={"90%"}
        className={classes.auto}
        height={12}
      />
      </Grid>
  );
  const plates = [];

  for (let index = 0; index < 15; index++) {
    plates.push(categories);
  }

  return (
    <div className={`container pageComponents ${classes.verticalSpace}`}>
    <Grid container spacing={2} className={classes.verticalSpace}>
    <Grid item md={2} className={classes.hideFrmMobile}>
    <Card className={classes.card} style={{height: 320}}>
        <Grid container spacing={1}>
        {plates.map((plate, index) => (
          <React.Fragment key={index}>{plate}</React.Fragment>
        ))}
      </Grid>
      </Card>
      </Grid>
    
    <Grid item xs>
      <Skeleton
      className={`${classes.radius} ${classes.carousel}`}
        animation="wave"
        variant="rect"
        width={"100%"}
      />
      </Grid>
      <Grid item md={2} className={classes.hideFrmMobile}>
      <Skeleton
      className={classes.radius}
        animation="wave"
        variant="rect"
        width={"100%"}
        height={320}
      />
      </Grid>
      </Grid>
        <Grid
        className={classes.verticalSpace}
        container
        spacing={2}
      >
        {frames.map((frame, index) => (
          <React.Fragment key={index}>{frame}</React.Fragment>
        ))}
      </Grid>

      <Grid
        className={classes.verticalSpace}
        container
        spacing={2}
      >
        {skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
      </Grid>
    </div>
  );
}

export default HomeSkeleton;
