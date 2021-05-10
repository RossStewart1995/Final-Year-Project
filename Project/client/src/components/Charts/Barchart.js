import React, {useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import {useSelector, useDispatch} from "react-redux";
import {Button, Grow, Typography} from "@material-ui/core";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import {CLEAR} from "../../constants/actionTypes";


const Barchart = ({isViewingResults, setViewingResults, currentPollID, setCurrentPollID}) => {
    const poll = useSelector((state) => currentPollID ? state.polls.find((p) => p._id === currentPollID) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const pollVotes = [];
    const chartcount = [];


    poll.choices.map((choice) => {
    var voteCount = 0;

        console.log(`Choices: ${choice}`)

    poll.votes.map((vote) => {
            console.log(`Votes: ${vote.choice}`)

            if(vote.choice === choice){
                console.log("MATCH")
                voteCount += 1;
            }

        })
    
    chartcount.push(voteCount);

    pollVotes.push({
        choice: choice,
        count: voteCount})
    })
    console.log(pollVotes)

    useEffect(() => {
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        }
    }, [poll]);

    const clear = () => {
        setCurrentPollID(null);
        setViewingResults(false);
    }
    
    return (
        <>
        <Grow in>
        <div className={classes.root}>

                    <div className={classes.chartContainer}>
                        <Bar
                            data={{
                                labels: poll.choices,
                                height: 500,

                                datasets: [
                                    {
                                        label: "Number of votes",
                                        data: chartcount,
                                        backgroundColor: "#b691f3"
                                    }
                                ]
                            }}

                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                maintainAspectRatio: false,
                                legend: {
                                    labels: {
                                        fontSize: 16,
                                    }
                                }
                            }
                            }

                        ></Bar>
                    </div>

                    {pollVotes.map((item) => (
                        <Typography className={classes.voteDetails} variant="body2" color="textSecondary">{`${item.choice} has ${item.count} votes.`}</Typography>
                    ))}

                    <Button className={classes.button} variant="contained" color="primary" onClick={clear}>Back</Button>
                    
                       
        </div>
        </Grow>
       </>
    )
}

export default Barchart
