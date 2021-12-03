import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

function FooterSkeleton() {
  return (
    <div className={`container pageComponents`}>
      <Skeleton animation="wave" variant="rect" width={"100%"} height={55} />
    </div>
  );
}

export default FooterSkeleton;
