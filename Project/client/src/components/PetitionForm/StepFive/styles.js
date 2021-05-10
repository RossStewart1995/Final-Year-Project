import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    
    heading: {
        paddingTop: "20px",
        color: "#000",
        textAlign: "center"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    title: {
        width: "100%",
        margin: "1rem",
    },
    petitionImage: {
        width: "35%",
        height: "150px",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginLeft: "auto",
        marginRight: "auto",
        border: "5px solid #483a61"
    },
    button: {
        '&:hover': {
            background: "#9174c2",
         },
        width: "30%",
        backgroundColor: "#7f65aa",
        margin: "15px"  
    }
    
  }));