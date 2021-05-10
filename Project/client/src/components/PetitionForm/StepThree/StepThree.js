import React, {useContext} from 'react'
import {Typography, Button, TextField, Paper} from "@material-ui/core";
import useStyles from "./styles";
import {multiStepContext} from "../StepContext";
import { useSnackbar } from 'notistack';


const StepThree = () => {
    const classes = useStyles();
    const {setStep, formData, setFormData} = useContext(multiStepContext);
    const { enqueueSnackbar } = useSnackbar();

    const NextStep = () => {
        if (formData.recipient === "") {
            enqueueSnackbar(`Recipient Field is Blank`, {
                variant: 'error'
            });
        } else {
            setStep(3)
        }
    }

    return (
        <div>
            <Paper>
                <Typography className={classes.heading} variant="h3">Choose A Recipient</Typography>
                <Typography className={classes.heading} variant="h6">Who has the power to solve your problem or take the action you are demanding</Typography>
                
                <form className={classes.form}>
                    <TextField className={classes.recipient} value={formData.recipient} onChange={(e) => setFormData({...formData, recipient: e.target.value})} variant="outlined" label="Recipient"/>

                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setStep(1)}>Back</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => NextStep()}>Next</Button>
                </form>
            </Paper>
        </div>
    )
}

export default StepThree
