import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    
    heading: {
        paddingTop: "20px",
        paddingBottom: "10px",
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
        margin: "25px",
        
    },
    root: {
        maxWidth: 345,
        marginLeft: "auto",
        marginRight: "auto",
        border: "2px solid #483a61",
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: "red[500]",
      },
      signButton: {
        '&:hover': {
            background: "#9174c2",
         },
        width: "100%",
        backgroundColor: "#7f65aa",
        color: "#ffffff"
      }
    
  }));