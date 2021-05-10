import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    title: {
        fontSize: "4rem",
        textAlign: "center",
        alignItems: "center"
    },
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: "400px"
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: "100%",
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));