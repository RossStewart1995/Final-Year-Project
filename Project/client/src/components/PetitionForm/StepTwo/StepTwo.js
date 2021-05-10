import React, {useContext} from 'react'
import {Typography, Button, TextField, Paper} from "@material-ui/core";
import useStyles from "./styles";
import {multiStepContext} from "../StepContext";
import { useSnackbar } from 'notistack';



const StepTwo = () => {
    const {setStep, formData, setFormData} = useContext(multiStepContext);
    const classes = useStyles();
    console.log(formData);
    const { enqueueSnackbar } = useSnackbar();

    
    const NextStep = () => {
        if (formData.title === "") {
            enqueueSnackbar(`Title field is empty`, {
                variant: 'error'
            });
        } else {
            setStep(2)
        }
    }

    return (
        <div>
            <Paper>
                <Typography className={classes.heading} variant="h3">Choose A Title</Typography>
                <Typography className={classes.heading} variant="h6">This is the first thing people will see about your petition. Get their attention with a short title that focusses on the change you’d like them to support.</Typography>
                
                <form className={classes.form}>
                    <TextField className={classes.title} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} variant="outlined" label="Title"/>

                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setStep(0)}>Back</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => NextStep()}>Next</Button>
                    
                </form>
            </Paper>
        </div>
    )
}

export default StepTwo
