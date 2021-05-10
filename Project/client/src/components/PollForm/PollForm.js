import React, {useEffect, useState} from 'react'
import {Paper, TextField, Button, Typography} from "@material-ui/core";
import useStyles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {updatePoll, createPollNew} from "../../actions/polls";
import { useSnackbar } from 'notistack';



const PollForm = ({currentPollID, setCurrentPollID, setIsVoting}) => {
    const { enqueueSnackbar } = useSnackbar();
    const poll = useSelector((state) => currentPollID ? state.polls.find((p) => p._id === currentPollID) : null);
    const classes = useStyles();
    const [pollData, setPollData] = useState({
        title: "",
        message: "",
        choices: ""
    });
    const user = JSON.parse(localStorage.getItem("profile"));

    const dispatch = useDispatch();

    useEffect(() => {
        if(poll) setPollData(poll);
    }, [poll]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(pollData.title === "" || pollData.message ===  "" || pollData.choices ===  "") {
            enqueueSnackbar(`Error: Data missing on creation form`, {
                variant: 'error'
            });
        } else {
            if(currentPollID){
                dispatch(updatePoll( currentPollID, {...pollData, name: user?.result?.name}));
            }else{
                dispatch(createPollNew({...pollData, name: user?.result?.name})).then(() => {
                    enqueueSnackbar("Poll Created Successfully!", {
                        variant: 'success'
                    });
                }).catch((error) => {
                    enqueueSnackbar(`Error: Poll Creation Failed`, {
                        variant: 'error'
                    });
                    throw error;
                })
            }
            clear();
        }

        
    }

    const clear = () => {
        setCurrentPollID(null);
        setIsVoting(false);
        setPollData({title: "", message: "", choices: ""});
    }
 


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentPollID ? "Editing" : "Creating"} a Poll</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={pollData.title} onChange={(e) => setPollData({...pollData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={pollData.message} onChange={(e) => setPollData({...pollData, message: e.target.value})}/>
                <TextField name="choices" variant="outlined" label="Choices (coma seperated)" fullWidth value={pollData.choices} onChange={(e) => setPollData({...pollData, choices: e.target.value.split(",")})}/>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentPollID ? "Update" : "Create"}</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default PollForm
