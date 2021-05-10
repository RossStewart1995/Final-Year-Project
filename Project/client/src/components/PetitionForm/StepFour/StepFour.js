import React, {useContext} from 'react'
import {Typography, Button, TextField, Paper} from "@material-ui/core";
import useStyles from "./styles";
import {multiStepContext} from "../StepContext";
import { useSnackbar } from 'notistack';


const StepFour = () => {
    const classes = useStyles();
    const {setStep, formData, setFormData} = useContext(multiStepContext);
    const { enqueueSnackbar } = useSnackbar();

    const NextStep = () => {
        if (formData.message === "") {
            enqueueSnackbar(`No details added, please consider adding more detail to support your petition.`, {
                variant: 'error'
            });
        } else {
            setStep(4)
        }
    }

    return (
        <div>
            <Paper>
                <Typography className={classes.heading} variant="h3">Explain the Problem</Typography>
                <Typography className={classes.heading} variant="h6">Explain how and what this change will impact. Please feel free to give as much detail as possible.</Typography>
                
                <form className={classes.form}>
                    <TextField className={classes.problem} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    multiline rows={5} variant="outlined" label="Problem"/>
                    
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setStep(2)}>Back</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => NextStep()}>Next</Button>
                </form>
            </Paper>
        </div>
    )
}

export default StepFour
