import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: "75%",
        height: "80%",
        margin: "6rem auto",
        border: "5px solid #483a61",
        backgroundColor: "#e9defb",
    },
    chartContainer: {
        marginTop: "20px",
        width: "350px",
        height: "350px",
        margin: "auto",
    },
    button: {
        '&:hover': {
            background: "#9174c2",
         },
        width: "50%",
        marginTop: "30px",
        backgroundColor: "#7f65aa",
        marginLeft: "25%",
        marginRight: "25%",
        marginBottom: "30px",
    },
    voteDetails: {
        textAlign: "center",
    }
  }));