import React, {useEffect, useState} from "react";
import {Container, Grow, Grid, } from "@material-ui/core";
import {useDispatch} from "react-redux";
import {getPolls} from "../../actions/polls";
import PollForm from "../../components/PollForm/PollForm";
import Polls from "../../components/Polls/Polls";
import Vote from "../../components/Polls/Vote/Vote";
import {useHistory} from "react-router-dom";
import {CLEAR} from "../../constants/actionTypes";
import Barchart from "../Charts/Barchart";
import '../Polls/grid.css'

const PollHome = () => {
    
    const [currentPollID, setCurrentPollID] = useState(null);
    const [isVoting, setIsVoting] = useState(false);
    const [isViewingResults, setViewingResults] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        } 

        dispatch(getPolls());
    }, [currentPollID, dispatch, isVoting])


    return (
        <>
        <Grow in>
                <Container>
                    {isViewingResults ? (
                    <Barchart  currentPollID={currentPollID} setCurrentPollID={setCurrentPollID} isViewingResults={isViewingResults} setViewingResults={setViewingResults}/>) : 
                    (<>
                    
                    {!isVoting ? (<>
                        {/* <PollForm currentPollID={currentPollID} setCurrentPollID={setCurrentPollID} isVoting={isVoting} setIsVoting={setIsVoting}/> */}
                        <Polls setCurrentPollID={setCurrentPollID} currentPollID={currentPollID} setIsVoting={setIsVoting} isVoting={isVoting} setViewingResults={setViewingResults}/>                   
                </>) :(
        
                <Vote currentPollID={currentPollID} setCurrentPollID={setCurrentPollID} isVoting={isVoting} setIsVoting={setIsVoting}/>)}
                
                </>)}
            </Container>
        </Grow>
        </>
    )
}

export default PollHome
