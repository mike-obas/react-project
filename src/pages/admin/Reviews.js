import React, { useEffect, useState, Fragment } from "react";
import useStyles from "../../styles/Admin";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Grid, Paper } from "@material-ui/core";
import CleanUpLoader from "../../utils/CleanUpLoader";
import CircularProgress from "../../components/CircularProgress";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function createData(product, customer, comment, rating, date) {
  return {
    product,
    customer,
    comment,
    rating,
    date,
  };
}

function Row(props) {
  dayjs.extend(relativeTime);
  const { row } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.otherRoot}>
        <TableCell align="center" component="th" scope="row">
          {row.product}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.customer}
        </TableCell>
        <TableCell align="center">{row.comment}</TableCell>
        <TableCell align="center">{row.rating}</TableCell>
        <TableCell align="center">
          <Typography variant="body2" noWrap>
            {dayjs(row.date).fromNow()}
          </Typography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Reviews() {
  CleanUpLoader();
  const consumeContext = useContext(UseContext);
  const classes = useStyles();
  const [reviews, setReviews] = useState(null);
  const [lastId, setLastId] = useState(null);
  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [countReviews, setCountReviews] = useState(null);

  useEffect(() => {
    let cancel = false;
    axios
      .get("/getRatingsCount")
      .then((res) => {
        if (cancel) return;
        let initialValue = 0;
        let totalCount = res.data.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.ratingsCount,
          initialValue
        );
        setCountReviews(totalCount);
      })
      .catch();
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    setErrors({});
    let cancel = false;
    axios
      .get("/retrieveAllReviews")
      .then((res) => {
        if (cancel) return;
        setLastId(res.data[0]);
        let newreviews = res.data;
        newreviews.shift();
        setReviews(newreviews);
      })
      .catch();
    return () => {
      cancel = true;
    };
  }, []);

  const handleGetMore = () => {
    setButtonLoading(true);
    axios
      .get(`/subsequentReviews/${lastId}`)
      .then((res) => {
        setLastId(res.data[0]);
        let newReviews = res.data;
        newReviews.shift();
        setReviews([...reviews, ...newReviews]);
        setButtonLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
        setButtonLoading(false);
      });
  };

  let rows = reviews
    ? reviews.map((review) =>
        createData(
          <Fragment>
            <Typography
              component={Link}
              className="coloredLink"
              to={`/product_review/${review.category}/${review.resolvedUrlName}/${review.productId}`}
              variant="body2"
            >
              {review.resolvedUrlName}
            </Typography>
          </Fragment>,
          <Fragment>
            <a className="coloredLink" href={`mailto: ${review.email}`}>
              {review.email}
            </a>
            <Typography variant="body2">
              {decodeURIComponent(review.name)}
            </Typography>
          </Fragment>,
          <Fragment>
            <Typography variant="body2">
              {decodeURIComponent(review.comment)}
            </Typography>
          </Fragment>,
          <Fragment>
            <Typography className={classes.tabHeading} variant="body1">
              {review.rating}
            </Typography>
          </Fragment>,
          review.createdAt
        )
      )
    : [];

  return (
    <div className="pageComponents">
      {consumeContext.authState.state ? (
        <React.Fragment>
          {!consumeContext.authState.disabled ? (
            <React.Fragment>
              {consumeContext.authState.role === "administrator" ||
              consumeContext.authState.role === "staff" ? (
                <div style={{ padding: "30px 0px" }}>
                  <Grid container justify="center">
                    <Grid>
                      <Paper className={classes.count}>
                        <Typography variant="h6" className={classes.countText}>
                          {countReviews && countReviews} Feedbacks
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Product
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Customer
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Comment
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Rating (0 - 5)
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Date
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length > 0 ? (
                          rows.map((row) => <Row key={row.date} row={row} />)
                        ) : (
                          <Fragment />
                        )}
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Grid
                              container
                              justify="center"
                              className={classes.buttonContainer}
                            >
                              <Grid
                                item
                                xs={12}
                                className={classes.noMoreProduct}
                              >
                                <Typography variant="body2">
                                  {errors.noMoreProduct && errors.noMoreProduct}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  endIcon={<ExpandMoreOutlinedIcon />}
                                  disabled={buttonLoading}
                                  onClick={handleGetMore}
                                >
                                  {buttonLoading && <CircularProgress />}
                                  <Typography
                                    className={classes.buttonText}
                                    variant="body2"
                                    noWrap
                                  >
                                    More results
                                  </Typography>
                                </Button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
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
  );
}
