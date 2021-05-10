import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    cardroot: {
        maxWidth: 345,
        marginTop: "10px",
        marginRight: "auto",
        marginLeft: "auto",
      },
    reasonfield: {
        marginTop: "10px",
        width: "100%"
    },
    info: {
        marginTop: "5px",
    },
    signButton: {
        '&:hover': {
            background: "#9174c2",
         },
        textAlign: "center",
        marginTop: "10px",
        width: "100%",
        backgroundColor: "#7f65aa",
        color: "#ffffff"
    }
  }));