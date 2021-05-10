import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    
    
    button: {
        '&:hover': {
            background: "#9174c2",
         },
        width: "30%",
        backgroundColor: "#7f65aa",
        margin: "15px",
        
    },
    root: {
        maxWidth: 500,
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