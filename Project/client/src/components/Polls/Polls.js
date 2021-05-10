import React from 'react'
import Poll from "./Poll/Poll";
import {useSelector} from "react-redux";
import './grid.css';
import PollForm from "../PollForm/PollForm"

import {CircularProgress} from "@material-ui/core";

const Polls = ({setCurrentPollID, setIsVoting, setViewingResults, currentPollID, isVoting}) => {
    const polls = useSelector((state) => state.polls);

    return (
        
        <>
        {!polls.length ? <CircularProgress /> : (
            <div className="items">
            <PollForm className="poll-form" currentPollID={currentPollID} setCurrentPollID={setCurrentPollID} isVoting={isVoting} setIsVoting={setIsVoting}/>
            {polls.map((item) => (
                <Poll poll={item} setCurrentPollID={setCurrentPollID} setIsVoting={setIsVoting} setViewingResults={setViewingResults}/>
            ))}
            </div>
        )}

        {/* <div className="items">
        {polls.map((item) => (
            <Poll poll={item} setCurrentPollID={setCurrentPollID} setIsVoting={setIsVoting} setViewingResults={setViewingResults}/>
        ))}
        </div> */}
        
        </>
    )
}

export default Polls
