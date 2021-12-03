import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/Skeleton";

const component = (
  <Grid item xs={6} sm={4} md={2}>
    <Skeleton animation="wave" variant="rect" width={"100%"} height={118} />
    <Skeleton animation="wave" variant="text" height={12} width={"100%"} />
    <Skeleton animation="wave" variant="text" height={12} width={"60%"} />
  </Grid>
);

const textComponent = (
  <Grid item xs={12}>
    <Skeleton animation="wave" variant="text" height={15} width={"100%"} />
  </Grid>
);

const detailComponent = (<React.Fragment>
<Grid item xs={4}>
  <Skeleton animation="wave" variant="rect" width={"100%"} height={50} />
  <Skeleton animation="wave" variant="text" height={20} width={"100%"} />
  <Skeleton animation="wave" variant="text" height={15} width={"60%"} />
</Grid>
<Grid item xs={8}>
<Grid item xs={12}>
    <Skeleton animation="wave" variant="text" height={15} width={"100%"} />
  </Grid>
  <Grid item xs={12}>
    <Skeleton animation="wave" variant="text" height={15} width={"100%"} />
  </Grid>
  <Grid item xs={12}>
    <Skeleton animation="wave" variant="text" height={15} width={"100%"} />
  </Grid>
  <Grid item xs={12}>
    <Skeleton animation="wave" variant="text" height={15} width={"100%"} />
  </Grid>
</Grid>
</React.Fragment>);

export function DetailSkeleton(){
  const classes = useStyles();
  const skeletons = [];
  for (let index = 0; index < 3; index++) {
    skeletons.push(detailComponent);
  }
return (
  <Grid
  className={classes.verticalSpace}
  style={{padding: '10px'}}
  container
  spacing={2}
>     
{skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
      </Grid>
      )
}

export function OneLineTextSkeleton(){
  const classes = useStyles();
  const skeletons = [];
  for (let index = 0; index < 1; index++) {
    skeletons.push(textComponent);
  }
  return(
        <Grid
        className={classes.verticalSpace}
        style={{padding: '0px 10px'}}
        container
      >
        {skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
        </Grid>
  )
}

export function FiveLinesTextSkeleton(){
  const classes = useStyles();
  const skeletons = [];

  for (let index = 0; index < 5; index++) {
    skeletons.push(textComponent);
  }
  return(
        <Grid
        className={classes.verticalSpace}
        style={{padding: '0px 10px'}}
        container
      >
        {skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
        </Grid>
  )
}

export function SixGridSkeleton() {
  const classes = useStyles();
  const skeletons = [];

  for (let index = 0; index < 6; index++) {
    skeletons.push(component);
  }

  return (
      <Grid
        className={classes.verticalSpace}
        style={{padding: '0px 10px'}}
        container
        spacing={2}
      >
        {skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
      </Grid>
  );
}
//three grids skeleton
export function ThreeGridSkeleton() {
  const classes = useStyles();
  const skeletons = [];
  for (let index = 0; index < 3; index++) {
    skeletons.push(component);
  }
  return (
    <Grid
        className={classes.verticalSpace}
        style={{padding: '0px 10px'}}
        container
        spacing={2}
      >
        {skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
        </Grid>
  );
}
//twenty grids skeleton
export function TwentyGridSkeleton() {
  const classes = useStyles();
  const skeletons = [];
  for (let index = 0; index < 20; index++) {
    skeletons.push(component);
  }
  return (
    <Grid
        className={classes.verticalSpace}
        style={{padding: '0px 10px'}}
        container
        spacing={2}
      >
        {skeletons.map((skeleton, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
        </Grid>
  );
}
//one grids skeleton
export function OneGridSkeleton() {
  return (
    <Grid>
    <Grid item xs={12}>
    <Skeleton animation="wave" variant="rect" width={"100%"} height={250} />
    <Skeleton animation="wave" variant="text" height={20} width={"100%"} />
    <Skeleton animation="wave" variant="text" height={15} width={"60%"} />
  </Grid>
        </Grid>
  );
}


