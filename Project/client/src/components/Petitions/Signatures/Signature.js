import React, {useEffect, useState} from 'react'
import useStyles from "./styles";
import { Typography, Button, TextField } from '@material-ui/core';
import {useSelector, useDispatch} from "react-redux";
import {submitPetitionSignatureNew} from "../../../actions/petitions";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


import {useSnackbar} from 'notistack';



const Signature = ({currentPetitionID, setCurrentPetitionID, isSigning, setIsSigning}) => {
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
    const petition = useSelector((state) => currentPetitionID ? state.petitions.find((pet) => pet._id === currentPetitionID) : null);
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();

    const [signatureDetails, setSignatureDetails] = useState({
        petition_id: petition._id,
        reason: "",
        user_id: user?.result?._id,
    });

    useEffect(() => {
    console.log(signatureDetails);
    console.log(petition.signatures);
    
    }, [petition, signatureDetails]);

    const clear = () => {
        setCurrentPetitionID(null);
        setIsSigning(false);
    }

    const handleSubmitSignature = () => {
        if(petition._id){
            console.log("Submitting Details")
            console.log(signatureDetails)
            dispatch(submitPetitionSignatureNew(petition._id, {signatureDetails})).then(() => {
                enqueueSnackbar("Petition Signed. Thank You!", {
                    variant: 'success'
                });
            }).catch((error) => {
                enqueueSnackbar(`Failed to sign petition, please try again`, {
                    variant: 'error'
                });
                throw error;
            })
        }
        clear();
    }
    
    return (
            <Card className={classes.cardroot}>
                    <CardMedia
                        component="img"
                        alt="Petition Image"
                        height="140"
                        image={petition.image}
                        title="Petition Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="h2">{petition.title}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{petition.message}</Typography>
                        <TextField className={classes.reasonfield} id="outlined-multiline-static" label="Reason...(Optional)" multiline rows={4} variant="outlined" onChange={(e) => setSignatureDetails({...signatureDetails, reason: e.target.value})} />
                        <Typography className={classes.info} variant="body2" color="textSecondary" component="p">{`${petition.username} started this petition to ${petition.recipient}`}</Typography>
                        {petition ? (
                        <Button className={classes.signButton} onClick={handleSubmitSignature}>Sign Petition</Button>) : (
                        <Button className={classes.signButton} disabled onClick={handleSubmitSignature}></Button>
                        )}
                        
                        
                        <Button className={classes.signButton} onClick={clear}>Cancel</Button>
                    </CardContent>
            </Card>
    )
}

export default Signature
