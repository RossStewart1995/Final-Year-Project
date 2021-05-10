import React, {useContext} from 'react'
import {Typography, Button, Paper} from "@material-ui/core";
import useStyles from "./styles";
import PreviewPetition from "../../Petitions/Petition/PreviewPetition";

import {multiStepContext} from "../StepContext";



const StepFive = () => {
    const classes = useStyles();
    const {setStep, formData, submitData} = useContext(multiStepContext);


    return (
        <div>
            <Paper>
                <Typography className={classes.heading} variant="h3">Preview</Typography>

                <PreviewPetition formData={formData}/>
      
                <div className={classes.form}>
                <Button className={classes.button} variant="contained" color="primary" onClick={() => setStep(4)}>Back</Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={submitData}>Submit</Button>
                </div>

            </Paper>
        </div>
    )
}


export default StepFive
