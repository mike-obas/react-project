import React from 'react'
import CleanUpLoader from "../../utils/CleanUpLoader"
import AdminProducts from './AdminCategories'
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'

function Products() {
    CleanUpLoader()
    const consumeContext = useContext(UseContext);
    return (
        <div>
            {consumeContext.authState.state ? (
        <React.Fragment>
          {!consumeContext.authState.disabled ? (
            <React.Fragment>
              {consumeContext.authState.role === "administrator" ||
              consumeContext.authState.role === "staff" ? (
        <div>
            <AdminProducts />
        </div>
        ) : (
            <Typography style={{ padding: 40 }} />
          )}
          </React.Fragment>
          ) : (
          <Typography style={{ padding: 40 }} variant="body2" color="error">
          {!consumeContext.authState.initializing &&
            "Your account has been disabled, contact support team"}
          </Typography>
          )}
          </React.Fragment>
          ) : (
          <Typography style={{ padding: 40 }} variant="body2" color="error">
          {!consumeContext.authState.initializing && "session timed out "}
          {!consumeContext.authState.initializing && (
          <Link to="/resume">login again</Link>
          )}
          </Typography>
          )}
          {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
        </div>
    )
}

export default Products
