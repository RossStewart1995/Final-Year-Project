import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: "75%",
        margin: "6rem auto",
        border: "5px solid #483a61",
        backgroundColor: "#e9defb",
    },
    stepper: {
        "& .MuiStepIcon-root.MuiStepIcon-active": {
            color: "#9174c2"
        },
        "& .MuiStepIcon-root.MuiStepIcon-completed": {
            color: "#483a61"
        },
        backgroundColor: "#cbb2f6",
    },
    buttonArea: {
        display: "flex",
        justifyContent: "space-between"
    },
    nextButton: {
        '&:hover': {
            background: "#9174c2",
         },
        margin: "10px",
        backgroundColor: "#7f65aa",
        width: "40%",
        color: "#e1d3fa"
    },
    prevButton: {
        '&:hover': {
            background: "#9174c2",
         },
        margin: "10px",
        backgroundColor: "#7f65aa",
        width: "40%",
        color: "#e1d3fa"
    },
  }));