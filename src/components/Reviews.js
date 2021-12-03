import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { IconButton } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import ReviewModal from './ReviewModal'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const useStyles = makeStyles((theme) => ({
    reviewsWrapper: {
        margin: '15px 0px'
    },
  iconButton: {
    padding: 0,
  },
  ratings: {
    margin: "6px 0px",
  },
}));
export function Reviews(props) {
  dayjs.extend(relativeTime)
  const classes = useStyles();
  let {
    review: { name, rating, comment, createdAt },
  } = props;
  const coloredStar = [];
  for (let index = 0; index < rating; index++) {
    coloredStar.push(<StarIcon color="primary" fontSize="small" />);
  }

  const plainStar = [];
  for (let index = 0; index < 5 - rating; index++) {
    plainStar.push(<StarBorderIcon fontSize="small" />);
  }
  return (
    <Fragment>
        {
            (name) &&
            <div className={classes.reviewsWrapper}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={6} sm={8}>
          <Typography variant="subtitle2">
            <span style={{ color: "black", fontWeight: 700 }}>{decodeURIComponent(name)}</span>
            <br />
            <span
              style={{
                display: "block",
                marginTop: "-3px",
                color: "grey",
                fontSize: '12px'
              }}
            >
              {dayjs(createdAt).fromNow()}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          {coloredStar.map((star, index) => (
            <IconButton key={index} className={classes.iconButton}>
              {star}
            </IconButton>
          ))}
          {plainStar.map((star, index) => (
            <IconButton key={index} className={classes.iconButton}>
              {star}
            </IconButton>
          ))}
        </Grid>
      </Grid>
      <Typography style={{marginTop: '5px'}} variant="body2">{decodeURIComponent(comment)}</Typography>
      </div>}
    </Fragment>
  );
}

export function Ratings(props) {
  const classes = useStyles();
  let {
    ratings: { ratingsCount, ratingsSum },
  } = props;
  const ratingsValue = Math.round(ratingsSum / ratingsCount);
  const coloredStar = [];
  for (let index = 0; index < ratingsValue; index++) {
    coloredStar.push(<StarIcon color="primary" fontSize="small" />);
  }

  const noRatingStar = [];
  for (let index = 0; index < 5; index++) {
    noRatingStar.push(<StarBorderIcon fontSize="small" />);
  }

  const plainStar = [];
  for (let index = 0; index < 5 - ratingsValue; index++) {
    plainStar.push(<StarBorderIcon fontSize="small" />);
  }
  return (
    <Fragment>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          className={classes.ratings}
        >
          <Grid item xs={12}>
            <Typography variant="body2" component='div'>
              {
              ratingsCount !== 0 && 
              coloredStar.map((star, index) => (
                <IconButton key={index} className={classes.iconButton}>
                  {star}
                </IconButton>
              ))
              }
              {ratingsCount !== 0 ?
              plainStar.map((star, index) => (
                <IconButton key={index} className={classes.iconButton}>
                  {star}
                </IconButton>
              )) : 
              noRatingStar.map((star, index) => (
                <IconButton key={index} className={classes.iconButton}>
                  {star}
                </IconButton>
              ))
            }
              &nbsp; (
              {ratingsCount < 2
                ? `${ratingsCount} rating`
                : `${ratingsCount} ratings`}
              ) &nbsp; &nbsp;
              <ReviewModal icon='smallIcon' />
            </Typography>
          </Grid>
        </Grid>
    </Fragment>
  );
}
