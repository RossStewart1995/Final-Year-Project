import React, {useEffect, useState} from "react";
import {Container, Grow, Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {CLEAR} from "../../constants/actionTypes";
import {getPetitions} from "../../actions/petitions"
import Petitions from "../Petitions/Petitions";
import Signature from "../Petitions/Signatures/Signature";

const PetitionHome = () => {
    
    const [currentPetitionID, setCurrentPetitionID] = useState(null);
    const [isSigning, setIsSigning] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        } 
        console.log(isSigning);
        console.log(currentPetitionID);

        dispatch(getPetitions());
    }, [currentPetitionID, dispatch, isSigning])


    return (
        <Grow in>
                <Container>
                    {!isSigning ? (
                        <Grid item >
                            <Petitions setCurrentPetitionID={setCurrentPetitionID} setIsSigning={setIsSigning} isSigning={isSigning}/>
                        </Grid>
                    ) : (
                        <Signature currentPetitionID={currentPetitionID} setCurrentPetitionID={setCurrentPetitionID} isSigning={isSigning} setIsSigning={setIsSigning}/>
                    )} 
                        
                </Container>
        </Grow>
    )
}

export default PetitionHome
