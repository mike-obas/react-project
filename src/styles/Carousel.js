import { makeStyles } from "@material-ui/styles";
 const useStyles = makeStyles((theme) => ({
    images: {
      width: "100%",
      height: "100%",
      borderRadius: '5px'
    },
    previewImages: {
      width: "100%",
      height: "100%",
      objectFit: 'contain',
      objectPosition: 'center'
    },
    splide: {
      "&:hover": {
        "& $buttonWrapper": {
          display: 'block !important',
        },
    },
  },
    buttonWrapper: { 
      display: 'none !important',
    fontSize: '20px',
    backgroundColor: "#4d4d4d !important",
      [theme.breakpoints.down("xs")]: {
          display: 'none !important'
      }
    },
    button: {
      color: "#ffffff",
      fontSize: "18px",
      transition: "200ms",
      cursor: "pointer",
    }
  }))
  export default useStyles