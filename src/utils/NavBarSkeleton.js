import React from 'react'
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "../styles/Skeleton";

function NavBarSkeleton() {
const classes = useStyles()
    return (
        <div className={classes.verticalSpace}>
            <Skeleton 
            animation="wave" 
            variant="rect" 
            width={'100%'} 
            height={48}
            />
        </div>
    )
}

export default NavBarSkeleton
