import React, {useContext} from 'react'
import {Typography, Button, TextField, Paper} from "@material-ui/core";
import useStyles from "./styles";
import {multiStepContext} from "../StepContext";
import { useSnackbar } from 'notistack';

const StepOne = () => {
    const classes = useStyles();
    const {setStep, formData, setFormData} = useContext(multiStepContext);
    const { enqueueSnackbar } = useSnackbar();

    const NextStep = () => {
        if(formData.topic === ""){
            enqueueSnackbar(`Topic field is empty`, {
                variant: 'error'
            });
        }else{
            setStep(1)
        }
    }

    return (
        <div>
            <Paper>
                <Typography className={classes.heading} variant="h3">Choose A Topic</Typography>
                <Typography className={classes.heading} variant="h6">What kind of issue are you petitioning on?</Typography>

                
                
                <form className={classes.form}>
                    <TextField className={classes.topic} value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} variant="outlined" label="Topic"/>

                    <Button className={classes.button} variant="contained" color="primary" onClick={() => NextStep()}>Next</Button>
                </form>

                
                
                

                
            </Paper>
        </div>
    )
}

export default StepOne
