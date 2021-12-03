import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    otherRoot: {
        borderBottom: '1px solid lightgrey',
    },
    tabHeading: {
        fontWeight: 700,
    },
    buttonContainer: {
      textAlign: 'center'
  },
  buttonText: {
      textTransform: 'capitalize'
  },
  noMoreProduct: {
      color: 'green',
      textAlign: 'center'
  },
  count: {
    maxWidth: "200px",
    padding: 20,
    marginBottom: 20
  },
  countText: {
    fontWeight: 700,
    color: 'green'
  }
  });

  export default useStyles