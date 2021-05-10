import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '35%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  details2: {
    display: 'flex',
    margin: '5px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonSubmit: {
    '&:hover': {
      background: "#9174c2",
   },
    color: '#ffffff',
    backgroundColor: "#7f65aa",
    width: '45%',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonDelete: {
    width: '45%',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  }
});