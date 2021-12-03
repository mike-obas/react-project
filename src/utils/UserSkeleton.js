import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "../styles/Skeleton";

function HomeSkeleton() {
  const classes = useStyles();

  return (
    <div className={`container pageComponents`}>
      <Skeleton
        className={classes.verticalSpace}
        animation="wave"
        variant="text"
        width={"80%"}
      />
       <Skeleton
        className={classes.verticalSpace}
        animation="wave"
        variant="text"
        width={"50%"}
      />
      <Skeleton animation="wave" variant="circle" width={100} height={100} />
      <Skeleton
        className={classes.verticalSpace}
        animation="wave"
        variant="rect"
        width={"90%"}
        height={208}
      />
      <Skeleton
        className={classes.verticalSpace}
        animation="wave"
        variant="text"
        width={"80%"}
      />
      <Skeleton
        className={classes.verticalSpace}
        animation="wave"
        variant="text"
        width={"70%"}
      />
      <Skeleton
        className={classes.verticalSpace}
        animation="wave"
        variant="text"
        width={"60%"}
      />
    </div>
  );
}

export default HomeSkeleton;
