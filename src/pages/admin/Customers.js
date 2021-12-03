import React, { useEffect, useState, Fragment } from "react";
import useStyles from "../../styles/Admin";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CleanUpLoader from "../../utils/CleanUpLoader";
import CircularProgress from "../../components/CircularProgress";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function createData(name, email, phoneNumber, created, action) {
  return {
    name,
    email,
    phoneNumber,
    created,
    action,
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
          {row.name}
        </TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.phoneNumber}</TableCell>
        <TableCell align="center">{dayjs(row.created).fromNow()}</TableCell>
        <TableCell align="center">
            {row.action}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Customers() {
  CleanUpLoader();
  const consumeContext = useContext(UseContext);
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  const [lastId, setLastId] = useState(null);
  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [countUsers, setCountUsers] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [uid, setUid] = useState(null)
  const [rerender, setRerender] = useState(0)

  useEffect(() => {
    setErrors({});
    let cancel = false;
    axios
      .get("/getProducts/users/createdAt-desc")
      .then((res) => {
        if (cancel) return;
        setLastId(res.data[0]);
        let newUsers = res.data;
        newUsers.shift();
        setUsers(newUsers);
      })
      .catch();
    return () => {
      cancel = true;
    };
  }, [rerender]);

  useEffect(() => {
    let cancel = false;
    axios
      .get("/countQuery/userCount/countField")
      .then((res) => {
        if (cancel) return;
        setCountUsers(res.data);
      })
      .catch();
    return () => {
      cancel = true;
    };
  }, [rerender]);

  const handleGetMore = () => {
    setButtonLoading(true);
    axios
      .get(`/moreProducts/users/${lastId}/createdAt-desc`)
      .then((res) => {
        setLastId(res.data[0]);
        let newUsers = res.data;
        newUsers.shift();
        setUsers([...users, ...newUsers]);
        setButtonLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
        setButtonLoading(false);
      });
  };

  const handleClick = (event) => {
    setUid({id: event.currentTarget.value});
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEnable = (action) => () => {
    setUid({...uid, action: action})
    setAnchorEl(null);
    const values = {
      open: true,
      performAction: false,
      message: `Enable access to this customer`,
      actionText: 'Enable',
      cancelText: 'Cancel'
    }
    return consumeContext.setDialog({ type: "open", modalContent: values })
  }
  const handleDisable = (action) => () => {
    setUid({...uid, action: action})
    setAnchorEl(null);
    const values = {
      open: true,
      performAction: false,
      message: `This customer will be disabled until you reverse this action, do you wish to continue?` ,
      actionText: 'Disable',
      cancelText: 'Cancel'
    }
    return consumeContext.setDialog({ type: "open", modalContent: values })
  }

  const handleDelete = (action) => () => {
    setUid({...uid, action: action})
    setAnchorEl(null);
    console.log(uid)
    const values = {
      open: true,
      performAction: false,
      message: ` This customer will be deleted permanently, do you wish to continue?` ,
      actionText: 'Delete',
      cancelText: 'Cancel'
    }
    return consumeContext.setDialog({ type: "open", modalContent: values })
  }

  useEffect(() => {
    let cancel = false;
    if(
      consumeContext.dialog.performAction && uid && 
      uid.action === "disable"){
        setActionLoading(true)
        axios.post("/userAccess/users", {uid: uid.id, action: true})
        .then(res => {
          if (cancel) return;
          setActionLoading(false)
          setRerender(prevState => prevState +1)
          return consumeContext.setDialog({ type: "close" })
        })
        .catch(() =>  {
          setActionLoading(false)
          return consumeContext.setDialog({ type: "close" })
        })
    }
    else if(
      consumeContext.dialog.performAction && uid && 
      uid.action === "enable"){
        setActionLoading(true)
        axios.post("/userAccess/users", {uid: uid.id, action: false})
        .then(res => {
          if (cancel) return;
          setActionLoading(false)
          setRerender(prevState => prevState +1)
          return consumeContext.setDialog({ type: "close" })
        })
        .catch(() =>  {
          setActionLoading(false)
          return consumeContext.setDialog({ type: "close" })
      })
     // console.log(`i am going to enable this ${uid.id}`) 
    }
    else if(
      consumeContext.dialog.performAction && uid && 
      uid.action === "delete"){
        setActionLoading(true)
        axios.post("/deleteUser/users/userCount", {uid: uid.id})
        .then(res => {
          if (cancel) return;
          setActionLoading(false)
          setRerender(prevState => prevState +1)
          return consumeContext.setDialog({ type: "close" })
        })
        .catch(() => {
          setActionLoading(false)
          return consumeContext.setDialog({ type: "close" })
      })
      
      //console.log(`i am going to delete this ${uid.id}`)
      
    }
    return () => { cancel = true }
  }, [uid, consumeContext])

  let rows = users
    ? users.map((user) =>
        createData(
          <Fragment>
            <Typography variant="body2">
              {user.firstName}
              &nbsp;
              {user.surname}
            </Typography>
          </Fragment>,
          <Fragment>
          <a className="coloredLink" href={`mailto: ${user.email}`}>
            {user.email}
          </a>
          </Fragment>,
          <Fragment>
            <Typography variant="body2">{user.phoneNumber}</Typography>
          </Fragment>,
          user.createdAt,
          <Fragment>
            {user.disabled &&
            <Typography variant="body2" color="textSecondary" className={classes.tabHeading}>
            DISABLED
            </Typography>
            }
        <Button 
        aria-controls="user-action-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
        value={user.productId}
        >
        <MoreVertIcon />
      </Button>
      <Menu
        id="user-action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
        onClick={
          handleEnable('enable')
          }
          >
            <Button variant="text">
            Enable
            </Button>
          </MenuItem>
        <MenuItem 
        onClick={
          handleDisable('disable')
          }
          >
            <Button variant="text">
            Disable
            </Button>
          </MenuItem>
        <MenuItem onClick={
          handleDelete('delete')
          }
          >
            <Button variant="text">
            Delete
            </Button>
            </MenuItem>
      </Menu>
            
          </Fragment>
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
                          {countUsers && countUsers.countValue}
                          {countUsers && countUsers.countValue <= 1
                            ? ` Customer`
                            : ` Customers`}
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
                              Name
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Email
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Phone Number
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              Created
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={classes.tabHeading}
                              variant="subtitle1"
                            >
                              {actionLoading && <CircularProgress />}
                              Action
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length > 0 ? (
                          rows.map((row) => <Row key={row.created} row={row} />)
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
