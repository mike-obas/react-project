import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
      maxWidth: "700px",
      margin: "auto",
      padding: "10px",
    },
    paperWrapper: {
      padding: "30px 10px",
    },
    formInnerWrapper: {
      marginTop: "15px",
    },
    formGroup: {
      padding: "0px 15px",
    },
    heading: {
      marginTop: '20px',
      textAlign: "center",
      fontWeight: 700,
    },
    containerButton: {
      display: "block",
    },
    uploadButton: {
      margin: "7px 0px 10px",
      textTransform: "capitalize",
    },
    mainImageContainer: {
      overflowX: "auto",
    },
    imageContainer: {
      width: '60px',
      position: "relative",
      paddingTop: "100%",
    },
    closeIconButton: {
      position: "absolute",
      top: 1,
      right: 1,
      background: 'rgba(0, 0, 0, 0.5)'
    },
    closeIcon: {
      fontSize: '15px',
      color: '#f2f2f2'
    },
    eachImage: {
      borderRadius: 4,
      border: "1px solid lightgrey",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    checkBoxRoot: {
      display: "flex",
      flexWrap: "wrap",
    },
    selectField: {
      marginTop: "15px",
    },
    datePickerField: {
      margin: "15px 0px",
    },
    submitButton: {
      width: "100%",
      margin: "20px auto 15px",
    },
    submitText: {
      color: "#ffffff",
    },
    divider: {
      margin: "10px 0px",
    },
    total: {
      padding: '10px 0px 3px',

    },
    totalTextContainer: {
      [theme.breakpoints.down(300)]: {
        display: 'none'
      }
    },
    totalAmount: {
      fontWeight: 700,
      fontSize: '17px',
      [theme.breakpoints.up(400)]: {
        fontSize: '20px'
      }
    },
    extraInfo: {
      color: 'green',
      margin: '5px 0px 0px'
    },
    additionalInfo: {
      margin: '5px 0px'
    },
    // spaceField: {
    //   margin: '16px 8px 10px 0px',
    // },
    field: {
      width: '25ch',
    },
  }));

export default useStyles

  