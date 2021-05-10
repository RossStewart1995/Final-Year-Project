import React, {useState, useEffect} from 'react'
import {Button, Paper, Container, Typography, Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from "./styles";
import {useSelector, useDispatch} from "react-redux";
import {submitVoteNew} from "../../../actions/polls";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';



const Vote = ({currentPollID, setCurrentPollID, setIsVoting}) => {
    const { enqueueSnackbar } = useSnackbar();
    const poll = useSelector((state) => currentPollID ? state.polls.find((p) => p._id === currentPollID) : null);
    
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const index = poll.votes.findIndex((obj) => obj.userid === user?.result?._id);

    const clear = () => {
        setCurrentPollID(null);
        setIsVoting(false);
    }

    const [state, setState] = useState();
    const [choice, setChoice] = useState({
      poll_id: "",
      poll_choice: "",
      user_id: "",
    });

    useEffect(() => {
      if(index !== -1){
        console.log("USER HAS VOTED");
        console.log(`Index: ${index}`)
      }else{
        console.log("USER HAS NOT VOTED");
        console.log(`Index: ${index}`)
      }
      }, [poll, index]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(state !== undefined){
            if(state !== ""){

              

              console.log(choice);

              dispatch(submitVoteNew(poll._id, {choice})).then(() => {
                enqueueSnackbar("Vote Submitted. Thank You", {
                    variant: 'success'
                });
            }).catch((error) => {
                enqueueSnackbar(`Error with Vote Submission`, {
                    variant: 'error'
                });
                throw error;
            })
                
            setChoice({poll_id: "", poll_choice: "", user_id: ""})
            setCurrentPollID(null);
            setIsVoting(false);
            }
        }else{
        }
    }

  const handleChange = (event) => {
    const name = event.target.value;
    setChoice({...choice, poll_id: poll._id, poll_choice: name, user_id: user?.result?._id});
    setState(name);
  };

 
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
        <Typography className={classes.title} variant="h5">{poll.title}</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>     

            {poll.choices.map((choice, index) => (
        <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
          <Typography  className={classes.heading}>{choice}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {`${choice}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.`}
          </Typography>
        </AccordionDetails>
      </Accordion>   
                ))}    



          {index === -1 ? (
          <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Choices...</InputLabel>
              <Select
                native
                onChange={handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option aria-label="None" value={null} />
                {poll.choices.map((choice, index) => (<option key={index} value={choice}>{choice}</option>))}

              </Select>
            </FormControl> ) : (

                <></>)}
              

                {index === -1 ? (
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Vote</Button> ) :
                (<Typography>You have already voted on this poll.</Typography> )} 
       
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Back</Button>
            </form>

        

        </Paper>
        </Container>
    )
}

export default Vote
