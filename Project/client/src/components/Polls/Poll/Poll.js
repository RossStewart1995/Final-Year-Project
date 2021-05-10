import React from 'react';
import {Card, CardContent, CardMedia, Button, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import {useDispatch} from "react-redux";
import {deletePoll} from "../../../actions/polls";

import useStyles from "./styles";
import bkg2 from "../../../images/bkg2.png"





const Poll = ({poll, setCurrentPollID, setIsVoting, setViewingResults}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    const handleVoteNav = () => {
        setCurrentPollID(poll._id);
        setIsVoting(true);
    }

    const handleViewResults = () => {
        setCurrentPollID(poll._id);
        setViewingResults(true);
    }
    

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={bkg2} title={poll.title}/>
                <div className={classes.overlay}>
                <Typography variant="body1">Total Number of Votes: {poll.votes.length}</Typography>
                    <Typography variant="body1" color="textSecondary">{`Poll created: ${moment(poll.createdAt).fromNow()}`}</Typography>
                </div>
                
                {(user?.result?.type === "admin") && (
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size="small" onClick={()=> setCurrentPollID(poll._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
                )}

            <div>
                <CardContent>
                    <Typography variant="h6">{poll.title}</Typography>
                    <Typography variant="body2" component="p">{poll.message}</Typography>
                </CardContent>
            </div>  
                <CardContent>
                <Typography variant="body2" color="textSecondary">{poll.choices.map((choice) => `${choice}, `)}</Typography>
                </CardContent>
            

            {(user?.result?.type === "user") && (
                <div>
                <Button className={classes.buttonSubmit} size="small" variant="contained" onClick={() => handleVoteNav()}>
                Vote
                </Button>
                <Button className={classes.buttonSubmit} size="small" variant="contained" onClick={() => handleViewResults()}>
                View Results
                </Button>
                </div>
            )}

            {(user?.result?.type === "admin") && (
                <Button className={classes.buttonDelete} size="small" variant="contained" color="secondary" onClick={() => {dispatch(deletePoll(poll._id))}}>
                <DeleteIcon fontSize="small"/>
                Delete
                </Button>
            )}
            
            </Card>
    )
}

export default Poll
