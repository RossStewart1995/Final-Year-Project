import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    heading: {
        paddingTop: "20px",
        color: "#000",
        textAlign: "center"
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      },
    media: {
        height: 0,
        paddingTop: '35%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
      },
    blurb: {
        paddingTop: "10px",
        color: "#000",
        textAlign: "center",
        fontSize: "20px"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: "center"
    },
    topic: {
        width: "100%",
        margin: "1rem",
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